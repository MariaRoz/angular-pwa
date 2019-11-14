import { AppLoadService } from './app-load.service';

export function initializeApp(appInitService: AppLoadService) {
  return (): Promise<void> => {
    return appInitService.Init();
  };
}
