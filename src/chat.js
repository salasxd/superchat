"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Msg = void 0;
const command_1 = require("bdsx/bds/command");
const networkidentifier_1 = require("bdsx/bds/networkidentifier");
const packetids_1 = require("bdsx/bds/packetids");
const command_2 = require("bdsx/command");
const common_1 = require("bdsx/common");
const event_1 = require("bdsx/event");
const util_1 = require("./util");
//§
const Users = new Map();
const LocalDist = 30;
const WisperDist = 3;
const ShoutDist = 80;
const MaxTeam = 30;
var Color;
(function (Color) {
    Color[Color["red"] = 0] = "red";
    Color[Color["white"] = 1] = "white";
    Color[Color["green"] = 2] = "green";
    Color[Color["orange"] = 3] = "orange";
    Color[Color["magenta"] = 4] = "magenta";
})(Color || (Color = {}));
var TypeData;
(function (TypeData) {
    TypeData[TypeData["color"] = 0] = "color";
    TypeData[TypeData["chat"] = 1] = "chat";
    TypeData[TypeData["addteam"] = 2] = "addteam";
    TypeData[TypeData["removeteam"] = 3] = "removeteam";
    TypeData[TypeData["private"] = 4] = "private";
})(TypeData || (TypeData = {}));
var TypeChat;
(function (TypeChat) {
    TypeChat[TypeChat["local"] = 0] = "local";
    TypeChat[TypeChat["wisper"] = 1] = "wisper";
    TypeChat[TypeChat["shout"] = 2] = "shout";
    TypeChat[TypeChat["private"] = 3] = "private";
    TypeChat[TypeChat["global"] = 4] = "global";
    TypeChat[TypeChat["team"] = 5] = "team";
    TypeChat[TypeChat["dimension"] = 6] = "dimension";
})(TypeChat || (TypeChat = {}));
var Team;
(function (Team) {
    Team[Team["add"] = 0] = "add";
    Team[Team["remove"] = 1] = "remove";
})(Team || (Team = {}));
command_2.command.register('chatprivate', 'superchat.command.info.private').overload((param, origin, output) => {
    const actor = origin.getEntity();
    if (actor) {
        if (actor.isPlayer()) {
            for (const target of param.target.newResults(origin)) {
                if (target.isPlayer()) {
                    setData(actor.getCertificate().getXuid(), TypeData.private, target.getCertificate().getXuid());
                }
            }
            output.success('superchat.command.private.success');
        }
        else {
            output.error('superchat.command.error');
        }
    }
    else {
        output.error('superchat.command.error');
    }
}, {
    target: command_1.PlayerWildcardCommandSelector,
});
command_2.command.register('chatteam', 'superchat.command.info.team').overload((param, origin, output) => {
    const actor = origin.getEntity();
    if (actor) {
        if (actor.isPlayer()) {
            let check = 0;
            for (const target of param.target.newResults(origin)) {
                if (target.isPlayer()) {
                    if (param.option == Team.add) {
                        const data = getData(actor.getCertificate().getXuid());
                        if (data.team.length <= MaxTeam) {
                            check = 1;
                            setData(actor.getCertificate().getXuid(), TypeData.addteam, target.getCertificate().getXuid());
                        }
                        else {
                            check = 2;
                        }
                    }
                    else {
                        check = 1;
                        setData(actor.getCertificate().getXuid(), TypeData.removeteam, target.getCertificate().getXuid());
                    }
                }
            }
            if (check == 1) {
                output.success('superchat.command.team.success');
            }
            else if (check == 2) {
                output.error('superchat.command.error.maxteam');
            }
            else {
                output.error('superchat.command.error');
            }
        }
        else {
            output.error('superchat.command.error');
        }
    }
    else {
        output.error('superchat.command.error');
    }
}, {
    option: command_2.command.enum("option", Team),
    target: command_1.PlayerWildcardCommandSelector,
});
command_2.command.register('chat', 'superchat.command.info').overload((param, origin, output) => {
    const actor = origin.getEntity();
    if (actor) {
        if (actor.isPlayer()) {
            setData(actor.getCertificate().getXuid(), TypeData.chat, param.type);
            switch (param.type) {
                case TypeChat.private: {
                    output.success('superchat.command.success.private');
                    break;
                }
                case TypeChat.team: {
                    output.success('superchat.command.success.team');
                    break;
                }
                default: {
                    output.success('superchat.command.success');
                    break;
                }
            }
        }
        else {
            output.error('superchat.command.error');
        }
    }
    else {
        output.error('superchat.command.error');
    }
}, {
    type: command_2.command.enum("type", TypeChat),
});
command_2.command.register('superchat', 'superchat.command.superchat').overload((param, origin, output) => {
    output.success(`${util_1.Plugin.Name()} V${util_1.Plugin.Version()} by ${util_1.Plugin.Creador()}`);
}, {});
function getData(xuid) {
    const regis = Users.get(xuid);
    if (regis) {
        return regis;
    }
    else {
        const newregis = { color: Color.white, chat: TypeChat.local, team: [], private: "" };
        return newregis;
    }
}
async function setData(xuid, type, data) {
    const regis = Users.get(xuid);
    if (regis) {
        switch (type) {
            case TypeData.chat: {
                regis.chat = parseInt(data + "", 10);
                break;
            }
            case TypeData.color: {
                regis.color = parseInt(data + "", 10);
                break;
            }
            case TypeData.private: {
                regis.private = data + "";
                break;
            }
            case TypeData.addteam: {
                let check = true;
                for (let i = 0; i < regis.team.length; i++) {
                    if (data == regis.team[i]) {
                        check = false;
                        break;
                    }
                }
                if (check) {
                    regis.team.push(data + "");
                }
                break;
            }
            case TypeData.removeteam: {
                const temp = [];
                for (let i = 0; i < regis.team.length; i++) {
                    if (data == regis.team[i]) {
                        continue;
                    }
                    temp.push(data + "");
                }
                regis.team = temp;
                break;
            }
        }
        Users.set(xuid, regis);
    }
    else {
        const newregis = { color: Color.white, chat: TypeChat.local, team: [], private: "" };
        switch (type) {
            case TypeData.chat: {
                newregis.chat = parseInt(data + "", 10);
                break;
            }
            case TypeData.color: {
                newregis.color = parseInt(data + "", 10);
                break;
            }
            case TypeData.private: {
                newregis.private = data + "";
                break;
            }
            case TypeData.addteam: {
                newregis.team.push(data + "");
                break;
            }
        }
        Users.set(xuid, newregis);
    }
}
event_1.events.packetBefore(packetids_1.MinecraftPacketIds.Text).on((ev, net) => {
    switch (ev.type) {
        case 1: {
            Msg(ev.message, net.getActor());
            return common_1.CANCEL;
        }
    }
});
async function Msg(msg, author) {
    for (const net of networkidentifier_1.NetworkIdentifier.all()) {
        const actor = net.getActor();
        if (actor && author && author.isPlayer()) {
            const data = getData(author.getCertificate().getXuid());
            switch (data.chat) {
                case TypeChat.local: {
                    if (Check(author, actor, LocalDist)) {
                        actor.sendMessage(`<${author.getName()}>[§e${TypeChat[data.chat]}§r]§f ${msg}`);
                    }
                    break;
                }
                case TypeChat.wisper: {
                    if (Check(author, actor, WisperDist)) {
                        actor.sendMessage(`<${author.getName()}>[§7${TypeChat[data.chat]}§r]§7 ${msg}`);
                    }
                    break;
                }
                case TypeChat.shout: {
                    if (Check(author, actor, ShoutDist)) {
                        actor.sendMessage(`<${author.getName()}>[§e${TypeChat[data.chat]}§r]§e ${msg}`);
                    }
                    break;
                }
                case TypeChat.private: {
                    author.sendMessage(`<${author.getName()}>[§6${TypeChat[data.chat]}§r]§6 ${msg}`);
                    if (data.private == actor.getCertificate().getXuid()) {
                        actor.sendMessage(`<${author.getName()}>[§6${TypeChat[data.chat]}§r]§6 ${msg}`);
                    }
                    break;
                }
                case TypeChat.global: {
                    actor.sendMessage(`<${author.getName()}>[§g${TypeChat[data.chat]}§r]§g ${msg}`);
                    break;
                }
                case TypeChat.team: {
                    for (let i = 0; i < data.team.length; i++) {
                        if (data.team[i] == actor.getCertificate().getXuid()) {
                            actor.sendMessage(`<${author.getName()}>[§3${TypeChat[data.chat]}§r]§3 ${msg}`);
                        }
                    }
                    if (actor.getCertificate().getXuid() == author.getCertificate().getXuid()) {
                        actor.sendMessage(`<${author.getName()}>[§3${TypeChat[data.chat]}§r]§3 ${msg}`);
                    }
                    break;
                }
                case TypeChat.dimension: {
                    if (author.getDimensionId() == actor.getDimensionId()) {
                        actor.sendMessage(`<${author.getName()}>[§a${TypeChat[data.chat]}§r]§a ${msg}`);
                    }
                    break;
                }
            }
        }
    }
}
exports.Msg = Msg;
function Check(player, player2, size) {
    if (player.getDimensionId() == player2.getDimensionId()) {
        let isX = false;
        let isY = false;
        let isZ = false;
        const Px1 = parseInt(player.getPosition().x + "", 10);
        const Py1 = parseInt(player.getPosition().y + "", 10);
        const Pz1 = parseInt(player.getPosition().z + "", 10);
        const Px2 = parseInt(player2.getPosition().x + "", 10);
        const Py2 = parseInt(player2.getPosition().y + "", 10);
        const Pz2 = parseInt(player2.getPosition().z + "", 10);
        for (let i = (Px1 - size); i <= (Px1 + size); i++) {
            if (i == Px2) {
                isX = true;
            }
        }
        for (let i = (Py1 - size); i <= (Py1 + size); i++) {
            if (i == Py2) {
                isY = true;
            }
        }
        for (let i = (Pz1 - size); i <= (Pz1 + size); i++) {
            if (i == Pz2) {
                isZ = true;
            }
        }
        if (isX && isY && isZ) {
            return true;
        }
    }
    return false;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNoYXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsOENBQWlFO0FBQ2pFLGtFQUErRDtBQUMvRCxrREFBd0Q7QUFFeEQsMENBQXVDO0FBQ3ZDLHdDQUFxQztBQUNyQyxzQ0FBb0M7QUFDcEMsaUNBQXVDO0FBRXZDLEdBQUc7QUFFSCxNQUFNLEtBQUssR0FBRyxJQUFJLEdBQUcsRUFBZSxDQUFDO0FBRXJDLE1BQU0sU0FBUyxHQUFHLEVBQUUsQ0FBQztBQUNyQixNQUFNLFVBQVUsR0FBRyxDQUFDLENBQUM7QUFDckIsTUFBTSxTQUFTLEdBQUcsRUFBRSxDQUFDO0FBQ3JCLE1BQU0sT0FBTyxHQUFHLEVBQUUsQ0FBQztBQVNuQixJQUFLLEtBTUo7QUFORCxXQUFLLEtBQUs7SUFDTiwrQkFBRyxDQUFBO0lBQ0gsbUNBQUssQ0FBQTtJQUNMLG1DQUFLLENBQUE7SUFDTCxxQ0FBTSxDQUFBO0lBQ04sdUNBQU8sQ0FBQTtBQUNYLENBQUMsRUFOSSxLQUFLLEtBQUwsS0FBSyxRQU1UO0FBRUQsSUFBSyxRQU1KO0FBTkQsV0FBSyxRQUFRO0lBQ1QseUNBQUssQ0FBQTtJQUNMLHVDQUFJLENBQUE7SUFDSiw2Q0FBTyxDQUFBO0lBQ1AsbURBQVUsQ0FBQTtJQUNWLDZDQUFPLENBQUE7QUFDWCxDQUFDLEVBTkksUUFBUSxLQUFSLFFBQVEsUUFNWjtBQUVELElBQUssUUFRSjtBQVJELFdBQUssUUFBUTtJQUNULHlDQUFLLENBQUE7SUFDTCwyQ0FBTSxDQUFBO0lBQ04seUNBQUssQ0FBQTtJQUNMLDZDQUFPLENBQUE7SUFDUCwyQ0FBTSxDQUFBO0lBQ04sdUNBQUksQ0FBQTtJQUNKLGlEQUFTLENBQUE7QUFDYixDQUFDLEVBUkksUUFBUSxLQUFSLFFBQVEsUUFRWjtBQUVELElBQUssSUFHSjtBQUhELFdBQUssSUFBSTtJQUNMLDZCQUFHLENBQUE7SUFDSCxtQ0FBTSxDQUFBO0FBQ1YsQ0FBQyxF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