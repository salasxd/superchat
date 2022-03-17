import { Actor, DimensionId } from "bdsx/bds/actor";
import { PlayerWildcardCommandSelector } from "bdsx/bds/command";
import { NetworkIdentifier } from "bdsx/bds/networkidentifier";
import { MinecraftPacketIds } from "bdsx/bds/packetids";
import { Player } from "bdsx/bds/player";
import { command } from "bdsx/command";
import { CANCEL } from "bdsx/common";
import { events } from "bdsx/event";
import { Plugin, Print } from "./util";

//§

const Users = new Map<string,User>();

const LocalDist = 30;
const WisperDist = 3;
const ShoutDist = 80;
const MaxTeam = 30;

interface User{
    color: Color;
    chat: TypeChat;
    team: Array<string>;
    private: string;
}

enum Color{
    red,
    white,
    green,
    orange,
    magenta,
}

enum TypeData{
    color,
    chat,
    addteam,
    removeteam,
    private
}

enum TypeChat{
    local,
    wisper,
    shout,
    private,
    global,
    team,
    dimension
}

enum Team{
    add,
    remove
}

command.register('chatprivate', 'superchat.command.info.private').overload((param, origin, output)=>{
    const actor = origin.getEntity();
    if(actor){
        if(actor.isPlayer()){
            for(const target of param.target.newResults(origin)) {
                if(target.isPlayer()){
                    setData(actor.getCertificate().getXuid(),TypeData.private,target.getCertificate().getXuid());
                }
            }
            output.success('superchat.command.private.success');
        }
        else{
            output.error('superchat.command.error');
        }
    }
    else{
        output.error('superchat.command.error');
    }
}, {
    target: PlayerWildcardCommandSelector,
});

command.register('chatteam', 'superchat.command.info.team').overload((param, origin, output)=>{
    const actor = origin.getEntity();
    if(actor){
        if(actor.isPlayer()){
            let check = 0;
            for(const target of param.target.newResults(origin)) {
                if(target.isPlayer()){
                    if(param.option == Team.add){
                        const data = getData(actor.getCertificate().getXuid());
                        if(data.team.length <= MaxTeam){
                            check = 1;
                            setData(actor.getCertificate().getXuid(),TypeData.addteam,target.getCertificate().getXuid());
                        }
                        else{
                            check = 2;
                        }
                    }
                    else{
                        check = 1;
                        setData(actor.getCertificate().getXuid(),TypeData.removeteam,target.getCertificate().getXuid());
                    }
                }
            }
            if(check == 1){
                output.success('superchat.command.team.success');
            }
            else if(check == 2){
                output.error('superchat.command.error.maxteam');
            }
            else{
                output.error('superchat.command.error');
            }
        }
        else{
            output.error('superchat.command.error');
        }
    }
    else{
        output.error('superchat.command.error');
    }
}, {
    option: command.enum("option", Team),
    target: PlayerWildcardCommandSelector,
});

command.register('chat', 'superchat.command.info').overload((param, origin, output)=>{
    const actor = origin.getEntity();
    if(actor){
        if(actor.isPlayer()){
            setData(actor.getCertificate().getXuid(),TypeData.chat,param.type);
            switch(param.type){
                case TypeChat.private:{
                    output.success('superchat.command.success.private');
                    break;
                }
                case TypeChat.team:{
                    output.success('superchat.command.success.team');
                    break;
                }
                default:{
                    output.success('superchat.command.success');
                    break;
                }
            }
        }
        else{
            output.error('superchat.command.error');
        }
    }
    else{
        output.error('superchat.command.error');
    }
}, {
    type: command.enum("type", TypeChat),
});

command.register('superchat', 'superchat.command.superchat').overload((param, origin, output)=>{
    output.success(`${Plugin.Name()} V${Plugin.Version()} by ${Plugin.Creador()}`);
}, {});

function getData(xuid: string) {
    const regis = Users.get(xuid);
    if(regis){
        return regis;
    }
    else{
        const newregis: User = {color:Color.white,chat:TypeChat.local,team:[],private:""}
        return newregis;
    }
}

async function setData(xuid: string, type: TypeData, data: string|number|boolean) {
    const regis = Users.get(xuid);
    if(regis){
        switch(type){
            case TypeData.chat:{
                regis.chat = parseInt(data + "",10);
                break;
            }
            case TypeData.color:{
                regis.color = parseInt(data + "",10);
                break;
            }
            case TypeData.private:{
                regis.private = data + "";
                break;
            }
            case TypeData.addteam:{
                let check = true;
                for(let i=0;i<regis.team.length;i++){
                    if(data == regis.team[i]){
                        check = false;
                        break;
                    }
                }
                if(check){
                    regis.team.push(data + "");
                }
                break;
            }
            case TypeData.removeteam:{
                const temp = [];
                for(let i=0;i<regis.team.length;i++){
                    if(data == regis.team[i]){
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
    else{
        const newregis: User = {color:Color.white,chat:TypeChat.local,team:[],private:""}
        switch(type){
            case TypeData.chat:{
                newregis.chat = parseInt(data + "",10);
                break;
            }
            case TypeData.color:{
                newregis.color = parseInt(data + "",10);
                break;
            }
            case TypeData.private:{
                newregis.private = data + "";
                break;
            }
            case TypeData.addteam:{
                newregis.team.push(data + "");
                break;
            }
        }

        Users.set(xuid, newregis);
    }
}

events.packetBefore(MinecraftPacketIds.Text).on((ev,net)=>{
    switch(ev.type){
        case 1:{
            Msg(ev.message,net.getActor());
            return CANCEL;
        }
    }
 });

 export async function Msg(msg: string, author: Actor|null){
     for(const net of NetworkIdentifier.all()){
        const actor = net.getActor();
        if(actor && author && author.isPlayer()){
            const data = getData(author.getCertificate().getXuid());
            switch(data.chat){
                case TypeChat.local:{
                    if(Check(author,actor,LocalDist)){
                        actor.sendMessage(`<${author.getName()}>[§e${TypeChat[data.chat]}§r]§f ${msg}`);
                    }
                    break;
                }
                case TypeChat.wisper:{
                    if(Check(author,actor,WisperDist)){
                        actor.sendMessage(`<${author.getName()}>[§7${TypeChat[data.chat]}§r]§7 ${msg}`);
                    }
                    break;
                }
                case TypeChat.shout:{
                    if(Check(author,actor,ShoutDist)){
                        actor.sendMessage(`<${author.getName()}>[§e${TypeChat[data.chat]}§r]§e ${msg}`);
                    }
                    break;
                }
                case TypeChat.private:{
                    author.sendMessage(`<${author.getName()}>[§6${TypeChat[data.chat]}§r]§6 ${msg}`);
                    if(data.private == actor.getCertificate().getXuid()){
                        actor.sendMessage(`<${author.getName()}>[§6${TypeChat[data.chat]}§r]§6 ${msg}`);
                    }
                    break;
                }
                case TypeChat.global:{
                    actor.sendMessage(`<${author.getName()}>[§g${TypeChat[data.chat]}§r]§g ${msg}`);
                    break;
                }
                case TypeChat.team:{
                    for(let i=0;i<data.team.length;i++){
                        if(data.team[i] == actor.getCertificate().getXuid()){
                            actor.sendMessage(`<${author.getName()}>[§3${TypeChat[data.chat]}§r]§3 ${msg}`);
                        }
                    }
                    if(actor.getCertificate().getXuid() == author.getCertificate().getXuid()){
                        actor.sendMessage(`<${author.getName()}>[§3${TypeChat[data.chat]}§r]§3 ${msg}`);
                    }
                    break;
                }
                case TypeChat.dimension:{
                    if(author.getDimensionId() == actor.getDimensionId()){
                        actor.sendMessage(`<${author.getName()}>[§a${TypeChat[data.chat]}§r]§a ${msg}`);
                    }
                    break;
                }
            }
        }
     }
 }

 function Check(player: Player, player2: Player, size: number){
    if(player.getDimensionId() == player2.getDimensionId()){
        let isX = false;
        let isY = false;
        let isZ = false;
        const Px1 = parseInt(player.getPosition().x + "",10);
        const Py1 = parseInt(player.getPosition().y + "",10);
        const Pz1 = parseInt(player.getPosition().z + "",10);
        const Px2 = parseInt(player2.getPosition().x + "",10);
        const Py2 = parseInt(player2.getPosition().y + "",10);
        const Pz2 = parseInt(player2.getPosition().z + "",10);
        for(let i=(Px1-size);i<=(Px1+size);i++){
            if(i == Px2){
                isX = true;
            }
        }
        for(let i=(Py1-size);i<=(Py1+size);i++){
            if(i == Py2){
                isY = true;
            }
        }
        for(let i=(Pz1-size);i<=(Pz1+size);i++){
            if(i == Pz2){
                isZ = true;
            }
        }
        if(isX && isY && isZ){
            return true;
        }
    }
    return false;
}