import { container } from 'tsyringe';
import { RoomService } from './modules/rooms/room.service.ts';
import { QuestionService } from './modules/questions/question.service.ts';
import { AudioService } from './modules/audio/audio.service.ts';

console.log('Registering dependencies...');

container.registerSingleton('RoomService', RoomService);
container.registerSingleton('QuestionService', QuestionService);
container.registerSingleton('AudioService', AudioService);

console.log('Dependencies registered.');
