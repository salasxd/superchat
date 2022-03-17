"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Print = exports.TypePrint = exports.Plugin = void 0;
const Name = "SuperChat";
const Version = "1.0.0";
const Creador = "SalasCris";
class Plugin {
    static Name() {
        return Name;
    }
    static Version() {
        return Version;
    }
    static Creador() {
        return Creador;
    }
}
exports.Plugin = Plugin;
var TypePrint;
(function (TypePrint) {
    TypePrint[TypePrint["log"] = 0] = "log";
    TypePrint[TypePrint["info"] = 1] = "info";
    TypePrint[TypePrint["warn"] = 2] = "warn";
    TypePrint[TypePrint["err"] = 3] = "err";
    TypePrint[TypePrint["ok"] = 4] = "ok";
})(TypePrint = exports.TypePrint || (exports.TypePrint = {}));
async function Print(msg, type = TypePrint.info) {
    switch (type) {
        case TypePrint.err: {
            console.error(`[${Plugin.Name()}] `.magenta + msg.red);
            break;
        }
        case TypePrint.warn: {
            console.warn(`[${Plugin.Name()}] `.magenta + msg.yellow);
            break;
        }
        case TypePrint.info: {
            console.info(`[${Plugin.Name()}] `.magenta + msg.white);
            break;
        }
        case TypePrint.log: {
            console.log(`[${Plugin.Name()}] `.magenta + msg.gray);
            break;
        }
        case TypePrint.ok: {
            console.log(`[${Plugin.Name()}] `.magenta + msg.green);
            break;
        }
    }
}
exports.Print = Print;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInV0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsTUFBTSxJQUFJLEdBQUcsV0FBVyxDQUFDO0FBQ3pCLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQztBQUN4QixNQUFNLE9BQU8sR0FBRyxXQUFXLENBQUE7QUFFM0IsTUFBYSxNQUFNO0lBQ2YsTUFBTSxDQUFDLElBQUk7UUFDUCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBQ0QsTUFBTSxDQUFDLE9BQU87UUFDVixPQUFPLE9BQU8sQ0FBQztJQUNuQixDQUFDO0lBQ0QsTUFBTSxDQUFDLE9BQU87UUFDVixPQUFPLE9BQU8sQ0FBQztJQUNuQixDQUFDO0NBQ0o7QUFWRCx3QkFVQztBQUVELElBQVksU0FNWDtBQU5ELFdBQVksU0FBUztJQUNqQix1Q0FBRyxDQUFBO0lBQ0gseUNBQUksQ0FBQTtJQUNKLHlDQUFJLENBQUE7SUFDSix1Q0FBRyxDQUFBO0lBQ0gscUNBQUUsQ0FBQTtBQUNOLENBQUMsRUFOVyxTQUFTLEdBQVQsaUJBQVMsS0FBVCxpQkFBUyxRQU1wQjtBQUVNLEtBQUssVUFBVSxLQUFLLENBQUMsR0FBVyxFQUFFLE9BQWtCLFNBQVMsQ0FBQyxJQUFJO0lBQ3JFLFFBQU8sSUFBSSxFQUFDO1FBQ1IsS0FBSyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUE7WUFDZixPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN2RCxNQUFNO1NBQ1Q7UUFDRCxLQUFLLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUNoQixPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN6RCxNQUFNO1NBQ1Q7UUFDRCxLQUFLLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUNoQixPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN4RCxNQUFNO1NBQ1Q7UUFDRCxLQUFLLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUNmLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3RELE1BQU07U0FDVDtRQUNELEtBQUssU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFBO1lBQ2QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDdkQsTUFBTTtTQUNUO0tBQ0o7QUFDTCxDQUFDO0FBdkJELHNCQXVCQyJ9