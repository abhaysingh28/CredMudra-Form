const apiEndPointsConfig = {
  //------- LOCATION --------//
  //--------- POST ----------//
  getCountriesList: "/location/get-countries",
  getStatesList: "/location/get-states",
  getCitiesList: "/location/get-cities",
  getPincodesAddress: "/location/pincode-address",

  //------- PUBLIC --------//
  //-------- POST ----------//
  ValidateOtp: "/public/validate-otp",
  SendOtp: "/public/send-otp",
  RefreshToken: "/public/refresh-token",
  Subscribe: "/public/subscribe",
  AgentLogin: "/public/agent-login",

  //------- USERS --------//
  //-------- POST ----------//
  GenerateLead: "/users/generate-lead",
  IncompleteJourney: "/users/incomplete-journey",
  PrePopulateFormData: "/users/pre-populate-form-data",
  LeadStatus: "/users/lead-status",
  CheckEligibility: "/users/check-eligibility",

  //--------- CORE ----------//
  //--------- POST ----------//
  getCompanyTypes: "/core/get-company-types",
  getQualifications: "/core/get-qualifications",
  getBusinessTypes: "/core/get-business-types",
  getProfessionTypes: "/core/get-profession-types",
  getResidenceTypes: "/core/get-residence-types",
  getIndustryTypes: "/core/get-industry-types",
  getBanks: "/core/get-banks",
  getWorkTypes: "/core/get-work-types",
  getGenderTypes: "/core/get-gender-types",
  getBusinessOwned: "/core/get-business-owned",

  //---------  MIS  ----------//
  //---------  GET ----------//
  getLenderFilters: "/mis/get-lender-filters",
  getStatusFilters: "/mis/get-status-filters",
  getFlexMonster: "/mis/flex-monster",
  //---------  POST  ----------//
  getLeadReport: "/mis/lead-report",
  getLenders: "/mis/get-lenders",
  setLenderPriority: "/mis/set-lender-priority",
  setLenderStatus: "/mis/set-lender-status",
  LenderKpi: "/mis/lender-kpi",

  //---------  MIS DASHBOARD-KPLS   ----------//
  //---------  POST ----------//
  LenderLeadStatus: "/mis/lender-lead-status",
  LenderPerformingStatus: "/mis/lender-performing-status",
  PeekAndMap: "/mis/peek-and-map",
  LeadsStats: "/mis/leads-stats",
};
export default apiEndPointsConfig;
