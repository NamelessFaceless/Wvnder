'use strict';

const { Broadcast: B } = require('ranvier');

module.exports = {
    usage: "@renameroom [new name]",
    command: state => async (args, player) => {
        const roomsLoader = state.EntityLoaderRegistry.get('rooms');
        const haveRooms = await roomsLoader.hasData();
        const roomId = player.room.id;

        roomsLoader.setArea(player.room.area.name);

        if(!haveRooms) {
            return B.sayAt(player, `Couldn't find the room. Please, contact an Admin.`);
        }
        let room = await roomsLoader.fetch(roomId);
        room.title = args;
        await roomsLoader.update(roomId, room);
        player.room.title = args;
        return state.CommandManager.get('look').execute(null, player);
    }
}