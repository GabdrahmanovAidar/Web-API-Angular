import { InjectionToken } from "@angular/core";

export interface IUdConfig {
  BASE_API_URI: string
}

export const UD_CONFIG = new InjectionToken<IUdConfig>('UdConfig');

export const UdConfig: IUdConfig = {
  BASE_API_URI: process.env.BASE_API_URI
};
