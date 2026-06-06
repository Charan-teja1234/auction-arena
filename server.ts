import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';
import { Server as SocketIOServer } from 'socket.io';
import { RoomManager, RoomState } from './lib/room-manager';

const port = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const roomManager = new RoomManager();

app.prepare().then(() => {
  const httpServer = createServer((req, res) => {
    const parsedUrl = parse(req.url || '', true);
    handle(req, res, parsedUrl);
  });

  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: '*', // Allow all for convenience in multiplayer testing
      methods: ['GET', 'POST'],
    },
  });

  // Socket ID to player details mapping
  const socketToPlayer = new Map<string, { roomId: string; playerId: string }>();

  io.on('connection', (socket) => {
    // console.log(`Socket connected: ${socket.id}`);

    // Join room
    socket.on('join-room', ({ roomId, playerId, name, teamName, avatarId, isSpectator, settings }) => {
      socket.join(roomId);
      socketToPlayer.set(socket.id, { roomId, playerId });

      let room = roomManager.getRoom(roomId);
      if (!room) {
        // Create room if not exists
        room = roomManager.createRoom(
          roomId,
          settings?.maxTeams ?? undefined,
          settings?.budget ?? undefined,
          settings?.timerDuration ?? undefined,
          settings?.poolSize ?? undefined
        );
      }

      try {
        const updatedRoom = roomManager.joinRoom(roomId, {
          id: playerId,
          name,
          teamName,
          avatarId,
          isSpectator: !!isSpectator,
        });

        if (updatedRoom) {
          io.to(roomId).emit('room-update', updatedRoom);
        }
      } catch (err: any) {
        socket.emit('join-error', { message: err.message || 'Failed to join room' });
      }
    });

    // Preview room
    socket.on('preview-room', ({ roomId }) => {
      socket.join(roomId);
      let room = roomManager.getRoom(roomId);
      if (!room) {
        room = roomManager.createRoom(roomId);
      }
      socket.emit('room-update', room);
    });

    // Start auction
    socket.on('start-auction', ({ roomId }) => {
      const updatedRoom = roomManager.startAuction(roomId);
      if (updatedRoom) {
        io.to(roomId).emit('room-update', updatedRoom);
      }
    });

    // Place bid
    socket.on('place-bid', ({ roomId, bidderId, customAmount }) => {
      const result = roomManager.placeBid(roomId, bidderId, customAmount);
      if (result.success && result.room) {
        io.to(roomId).emit('room-update', result.room);
        io.to(roomId).emit('bid-success', { bidderId, amount: result.room.currentBid });
      } else if (result.room) {
        socket.emit('bid-error', { message: result.message || 'Failed to place bid' });
      }
    });

    // Chat and reactions
    socket.on('chat-message', ({ roomId, senderId, senderName, message, type }) => {
      const updatedRoom = roomManager.handleChat(roomId, senderId, senderName, message, type);
      if (updatedRoom) {
        io.to(roomId).emit('room-update', updatedRoom);
        if (type === 'reaction') {
          io.to(roomId).emit('reaction-received', { senderId, emoji: message });
        }
      }
    });

    // Add specific bot personality
    socket.on('add-bot', ({ roomId, personality }) => {
      const updatedRoom = roomManager.addBot(roomId, personality);
      if (updatedRoom) {
        io.to(roomId).emit('room-update', updatedRoom);
      }
    });

    // Fill remaining slots with AI bots
    socket.on('fill-bots', ({ roomId }) => {
      const updatedRoom = roomManager.fillWithBots(roomId);
      if (updatedRoom) {
        io.to(roomId).emit('room-update', updatedRoom);
      }
    });

    // Leave room manually
    socket.on('leave-room', ({ roomId, playerId }) => {
      const updatedRoom = roomManager.leaveRoom(roomId, playerId);
      if (updatedRoom) {
        io.to(roomId).emit('room-update', updatedRoom);
      }
      socket.leave(roomId);
      socketToPlayer.delete(socket.id);
    });

    // Disconnection handler
    socket.on('disconnect', () => {
      const playerDetails = socketToPlayer.get(socket.id);
      if (playerDetails) {
        const { roomId, playerId } = playerDetails;
        const updatedRoom = roomManager.leaveRoom(roomId, playerId);
        if (updatedRoom) {
          io.to(roomId).emit('room-update', updatedRoom);
        }
        socketToPlayer.delete(socket.id);
      }
    });
  });

  // Game loop ticking every second
  setInterval(() => {
    // We tick all rooms active on this server instance
    // Active rooms are those in states other than 'LOBBY' or 'COMPLETED'
    // To make it easy, we search the manager for rooms
    // We can access the private Map by adding a helper or simply ticking all room IDs
    // Since we know the rooms, let's expose an active room checker or just tick everything
    // It's low-overhead since it returns immediately for Lobby/Completed
    
    // We can gather all room IDs currently in the manager
    // Let's call a method on roomManager or get all keys
    // Since we don't have a direct rooms getter, let's look at RoomManager implementation:
    // RoomManager has rooms: Map<string, RoomState>
    // We can access it if we make it public or export keys.
    // Let's cast it to any to read keys, or add a getRoomIds method.
    // Let's add a method on roomManager to get all room IDs or check active states.
    // Since roomManager is ours, we can access it using keys. Let's use Object.keys / Map.keys
    
    const activeRooms = (roomManager as any).rooms as Map<string, RoomState>;
    if (activeRooms) {
      for (const roomId of activeRooms.keys()) {
        const room = activeRooms.get(roomId);
        if (room && room.status !== 'LOBBY' && room.status !== 'COMPLETED') {
          const updatedRoom = roomManager.tickRoom(roomId);
          if (updatedRoom) {
            io.to(roomId).emit('room-update', updatedRoom);
          }
        }
      }
    }
  }, 1000);

  httpServer.listen(port, () => {
    console.log(`> Server listening at http://localhost:${port} as ${dev ? 'development' : 'production'}`);
  });
});
