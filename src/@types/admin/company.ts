export type Company = {
    id: number;
    type: string;
    related_id: number;
    related_type: string;
    created_at: string;
    updated_at: string;
    related: {
      id: number;
      name: string;
      balance?: number;
    };
  }
  
export type IndexCompaniesResponse= {
    success: boolean;
    code: number;
    message: null | string;
    data: {
      companies: Company[];
    };
}
  
export type CompanyType = "organization" | "fuel_supplier";

export type AddCompanyCredential={
    type: CompanyType;
    name: string;
}