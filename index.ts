import { events } from "bdsx/event";
import { Plugin, Print, TypePrint } from "./src/util";

Print("Agregado",TypePrint.warn);

events.serverOpen.on(()=>{
    require("./src/chat");
    Print(`V${Plugin.Version()} by ${Plugin.Creador()}`,TypePrint.ok);
});

events.serverClose.on(()=>{
    Print("Cerrando",TypePrint.warn);
});
