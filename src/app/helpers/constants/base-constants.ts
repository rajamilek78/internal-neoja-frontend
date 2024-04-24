import { RouteConstant } from "./app-routes.constants";

export class BASE {
    public static TOAST_TIMEOUT = 3000;
    public static ENCRYPTION_TOKEN = 'boilerplate';
}

export class HttpStatus {
    public static SUCCESS = 200;
    public static UNAUTHORIZED = 401;
    public static FORBIDDEN = 403;
    public static EXPIRED = 450;
}

export enum ToastStatus {
    UNKNOWN = 0,
    SUCCESS = 1,
    ERROR = 2,
    MULTIPLE = 3,
}

export class AppConstant {
    public static PAGE_SIZE = 20;
    public static TIMER = 300;
    public static NO_DATA = 'No data found';
    public static PAGINATION_ARRAY: number[] = [10, 25, 50, 100];
    public static FIVE_MB_IMAGE_SIZE = 5000000;
    public static TRANSFER_STATUS_TIMER = 5000;
    public static API_KEY = "eleagueonlineapis";
}

export const globalToastConfig = {
    positionClass: 'toast-top-center',
    maxOpened: 1,
    preventDuplicates: true,
};

// IndividualConfig
export const individualToastConfig = {
    timeOut: BASE.TOAST_TIMEOUT,
    closeButton: true,
};

export enum HttpMethodsTypeEnum {
    GET = 'get',
    POST = 'post',
    PUT = 'put',
    DELETE = 'delete',
    PUT_MULTIPART = 'putMultiPart',
    POST_MULTIPART = 'postMultiPart',
}
export const publicRoutes = [
    `/auth/${RouteConstant.LOGIN}`,
  ];

  export const RoundsPerDayValues = ['1', '2'];