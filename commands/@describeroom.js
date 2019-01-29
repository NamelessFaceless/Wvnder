'use strict';

const { Broadcast: B } = require('ranvier');

module.exports = {
    usage: "@describeroom [description]",
    command: state => async (args, player) => {
        const roomsLoader = state.EntityLoaderRegistry.get('rooms');
        const haveRooms = await roomsLoader.hasData();
        const roomId = player.room.id;

        roomsLoader.setArea(player.room.area.name);

        if(!haveRooms) {
            return B.sayAt(player, `Couldn't find the room. Please, contact an admin.`);
        }
        let room = await roomsLoader.fetch(roomId);
        room.description = args;
        await roomsLoader.update(roomId, room);
        player.room.description = args;
        return state.CommandManager.get('look').execute(null, player);
    }
}