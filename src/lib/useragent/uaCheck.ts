// uaCheck.ts
import { supportedBrowsersPatterns } from './supportedBrowsers';

export function isSupportedUA(userAgent: string): boolean {
  return supportedBrowsersPatterns.some((pattern) => pattern.test(userAgent));
}
