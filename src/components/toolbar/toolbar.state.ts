export class ToolbarState {
  private static instance: ToolbarState;

  activeMenu: string = localStorage.getItem('activeMenu') || '';

  private constructor() {}

  static getInstance() {
    if (!ToolbarState.instance) {
      ToolbarState.instance = new ToolbarState();
    }
    return ToolbarState.instance;
  }
}
