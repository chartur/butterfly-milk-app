import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class TabsServices {
    public tabsVisibility: EventEmitter<boolean> = new EventEmitter();

    toggleTabsVisibility(status: boolean) {
        this.tabsVisibility.emit(status);
    }
}
