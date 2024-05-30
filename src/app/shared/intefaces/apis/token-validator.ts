export interface TokenValidator {
  Status: Status;
  SecObjRec: SECObjRec;
}

export interface SECObjRec {
  SecObjInfoBean: SECObjInfoBean;
}

export interface SECObjInfoBean {
  SecObjData: SECObjData[];
}

export interface SECObjData {
  SecObjDataKey: string;
  SecObjDataValue: string;
  SecObjDataType: string;
}

export interface Status {
  StatusCode: number;
  StatusDesc: string;
}

export interface CsrfInterface {
  token: string;
}
