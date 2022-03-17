"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const event_1 = require("bdsx/event");
const util_1 = require("./src/util");
(0, util_1.Print)("Agregado", util_1.TypePrint.warn);
event_1.events.serverOpen.on(() => {
    require("./src/chat");
    (0, util_1.Print)(`V${util_1.Plugin.Version()} by ${util_1.Plugin.Creador()}`, util_1.TypePrint.ok);
});
event_1.events.serverClose.on(() => {
    (0, util_1.Print)("Cerrando", util_1.TypePrint.warn);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFvQztBQUNwQyxxQ0FBc0Q7QUFFdEQsSUFBQSxZQUFLLEVBQUMsVUFBVSxFQUFDLGdCQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7QUFFakMsY0FBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsR0FBRSxFQUFFO0lBQ3JCLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUN0QixJQUFBLFlBQUssRUFBQyxJQUFJLGFBQU0sQ0FBQyxPQUFPLEVBQUUsT0FBTyxhQUFNLENBQUMsT0FBTyxFQUFFLEVBQUUsRUFBQyxnQkFBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3RFLENBQUMsQ0FBQyxDQUFDO0FBRUgsY0FBTSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsR0FBRSxFQUFFO0lBQ3RCLElBQUEsWUFBSyxFQUFDLFVBQVUsRUFBQyxnQkFBUyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3JDLENBQUMsQ0FBQyxDQUFDIn0=