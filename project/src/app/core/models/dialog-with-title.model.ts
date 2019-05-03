import { Film } from './index';

export class DialogWithTitleModel {
    title?: string;
    message: string;
    $event?: Event;
    film?: Film;
}
