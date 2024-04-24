import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { AppLogger } from '@app/helpers/functions';
import { AppConstant, HttpMethodsTypeEnum, } from '@app/helpers/constants';
import { SharedService } from './shared.service';
import { HttpHelperService } from './http-helper.service';
import { SnackBarService } from './snackbar.service';
import { UserModel } from '@app/helpers/models';

@Injectable()
export class APIManager extends HttpHelperService {
  userDetail!: UserModel | null;
  session_id!: string;
  userDetailSub$!: Subscription;
  
  constructor(sharedService: SharedService,
    snackBarService: SnackBarService,
    http: HttpClient) {
    super(sharedService, http,snackBarService);

    this.userDetailSub$ = this.sharedService
      .getUserDetailCall()
      .subscribe(() => {
        this.userDetail = this.sharedService.getUser();
        if (this.userDetail) {
          //this.clubID = this.userDetail?.club_id;
          this.session_id = this.userDetail?.session_id;
        }
      });
  }

  // return authorization header
  get Authorized_HttpOptions_JSON() {
    const authToken = this.sharedService.getToken();
    const httpOptions = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `${authToken}`
    });
    return { headers: httpOptions };
  }

  // // return authorization header
  // get Authorized_HttpOptions() {
  //   const authToken = this.sharedService.getToken();
  //   const httpOptions = new HttpHeaders({
  //     Authorization: `${authToken}`
  //   });
  //   return { headers: httpOptions };
  // }

  // return authorization header
  // get Authorized_HttpOptionsWithKey() {
  //   const authToken = this.sharedService.getToken();
  //   const httpOptions = new HttpHeaders({
  //     Authorization: `${authToken}`,
  //     'API-Key': `${AppConstant.API_KEY}`,
  //     'sessionId': this.session_id
  //   });
  //   return { headers: httpOptions };
  // }
  get Authorized_HttpOptionsWithKey() {
    const authToken = this.sharedService.getToken();
    const httpHeaders = {
      Authorization: `${authToken}`,
      'API-Key': `${AppConstant.API_KEY}`,
    };
  
    // Check if session_id is available before adding it to the headers
    if (this.session_id) {
      httpHeaders['session_id'] = this.session_id;
    }
  
    const httpOptions = new HttpHeaders(httpHeaders);
    return { headers: httpOptions };
  }

  // return authorisation header with only content-type
  get Content_Type_Json_HttpOptions() {
    const httpOptions = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return { headers: httpOptions };
  }

  // return authorisation header with only content-type
  get Content_Type_Form_Url_HttpOptions() {
    const httpOptions = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    return { headers: httpOptions };
  }

  // return authorisation header with content-type as x-www-form-urlencoded
  get Form_URL_Encoded_HttpOptions() {
    const authToken = this.sharedService.getToken();
    const httpOptions = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `${authToken}`
    });
    return { headers: httpOptions };
  }

  // return authorisation header with blob
  get Blob_HttpOptions(): any {
    const authToken = this.sharedService.getToken();
    return {
      headers: new HttpHeaders({
        Authorization: `${authToken}`
      }),
      responseType: 'blob'
    };
  }

  get Blob_HttpOptions_2(): any {
    const authToken = this.sharedService.getToken();
    return {
      headers: new HttpHeaders({}),
      responseType: 'blob'
    };
  }

  get File_Upload_HttpOptions(): any {
    const authToken = this.sharedService.getToken();
    return {
      headers: new HttpHeaders({
        Authorization: `${authToken}`
      }),
      reportProgress: true,
      responseType: 'json'
    };
  }


  /**
   * method name : overridable httpHelperMethod
   * purpose : handle loader, and call overload in parent class for getting Observable of response
   * created : Sep 24 2018 11:30 AM
   * Revision :
   */
  override httpHelperMethod(methodType: HttpMethodsTypeEnum, url: string, params = {},
    httpOptions = this.Authorized_HttpOptions_JSON,
    showToast, showLoader, customMessage = '', searchParams = {}, filesObj?: any[]): Observable<any> | Observable<HttpEvent<any>> {
    if (showLoader) {
      AppLogger(`<=====starting of api call=====> ${url}`);
      this.sharedService.setLoader(true);
    }
    if (methodType === HttpMethodsTypeEnum.POST_MULTIPART || methodType === HttpMethodsTypeEnum.PUT_MULTIPART) {
      params = this.createFormDataObject(params, filesObj);
    }
    return super.httpHelperMethod(methodType, url, params, httpOptions, showToast, showLoader, customMessage, searchParams, filesObj);
  }

  getImage(imageUrl: string): Observable<Blob> {
    return this.http.get(imageUrl, { responseType: 'blob' });
  }

  // /**
  //  * return formData object from filesObject

  getApis = (url, params = {}, loader = true, header = this.Authorized_HttpOptionsWithKey): Observable<any> => {
    return this.httpHelperMethod(HttpMethodsTypeEnum.GET, url, params, header, false, loader);
  }

  postApis = (url, body = {}, showToast = true, showLoader = true, header = this.Authorized_HttpOptionsWithKey): Observable<any> => {
    return this.httpHelperMethod(
      HttpMethodsTypeEnum.POST, url, body,
      header, showToast, showLoader);
  }

  postMultiPartApis = (url, params = {}, headers, fileArray, showToast = true, showLoader = true): Observable<any> => {
    return this.httpHelperMethod(
      HttpMethodsTypeEnum.POST_MULTIPART, url, params,
      headers ? headers : this.File_Upload_HttpOptions, showToast, showLoader, '', {}, fileArray);
  }

  postOrPutApis = (url, params = {}, methodType: HttpMethodsTypeEnum = HttpMethodsTypeEnum.POST,
    showToast = true, showLoader = true): Observable<any> => {
    return this.httpHelperMethod(
      methodType, url, params,
      this.Authorized_HttpOptionsWithKey, showToast, showLoader);
  }

  deleteApis = (url, params = {}): Observable<any> => {
    return this.httpHelperMethod(
      HttpMethodsTypeEnum.DELETE, url, params,
      this.Authorized_HttpOptionsWithKey, true, true);
  }

  createFormDataObject = (params, filesObj) => {
    const formData = new FormData();
    for (const obj of filesObj) {
      const imgFilesObj: File[] = obj.files;
      for (const fileObj of imgFilesObj) {
        formData.append(obj.reqKey, fileObj, fileObj.name);
      }
    }
    if (params && (Object.keys(params).length)) {
      for (const docKey in params) {
        if (typeof params[docKey] === 'object') {
          formData.append(docKey, JSON.stringify(params[docKey]));
        } else {
          formData.append(docKey, params[docKey]);
        }
      }
    }
    return formData;
  };
}
