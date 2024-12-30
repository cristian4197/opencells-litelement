// /toolbar/ToolbarState.ts

import { IStorage } from "../../../storage/interfaces/storage";
import { LocalStorageService } from "../../../storage/services/localStorage.service";

export class ToolbarState {
  private static instance: ToolbarState;
  private storage: IStorage;
  private _activeMenu: string;

  private constructor(storage: IStorage) {
    this.storage = storage;
    this._activeMenu = this.storage.getItem('activeMenu') || '';
  }

  static getInstance(storage: IStorage = new LocalStorageService()): ToolbarState {
    if (!ToolbarState.instance) {
      ToolbarState.instance = new ToolbarState(storage);
    }
    return ToolbarState.instance;
  }

  get activeMenu(): string {
    return this._activeMenu;
  }

  set activeMenu(value: string) {
    this._activeMenu = value;
    this.storage.setItem('activeMenu', value);
  }

  clearActiveMenu(): void {
    this._activeMenu = '';
    this.storage.removeItem('activeMenu');
  }
}