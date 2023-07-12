import React, { useContext, useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Select } from 'formik-material-ui';
import { Box, Button, MenuItem, Slider, Typography } from '@mui/material';
import { RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { Autocomplete, TextField } from '@mui/material';
import { ValidateOtp, sendOpt } from './services/credMudra/index';
import {
    getBanks,
    getBusinessOwned,
    getBusinessTypes,
    getCompanyTypes,
    getGenderTypes,
    getIndustryTypes,
    getProfessionTypes,
    getQualifications,
    getResidenceTypes
} from './services/credMudra/core/index';
import { getPrePopulateFormData } from './services/credMudra/users/index';
import JwtService from './services/jwtService/index';

const initialValues = {
    phoneNumber: '',
    loanAmount: '',
    loanTenure: '',
    panCard: '',
    email: '',
    companyType: '',
    industry: '',
    designation: '',
    companyName: '',
    companyAddress: '',
    companyPincode: '',
    companyCity: '',
    companyState: '',
    companyCountry: '',
    jobDuration: '',
    monthlyIncome: '',
    modeOfSalary: '',
    bankAccount: '',
    /////////////////////////////
    yearsCurrentProfession: '',
    professionType: '',
    companyName: '',
    companyAddress: '',
    companyPinCode: '',
    companyCity: '',
    companyState: '',
    companyCountry: '',
    designation: '',
    turnover: '',
    monthlyProfit: '',
    currentAccountWith: '',
    primarySavingsBankAccount: '',
    /////////////////////////////
    businessRunBy: '',
    yearsCurrentBusiness: '',
    businessType: '',
    industry: '',
    companyName: '',
    companyAddress: '',
    businessDesignation: '',
    businessTurnover: '',
    businessMonthlyProfit: '',
    businessAccountWith: '',
    primarySavingsBankAccount: '',
    /////////////////////////////
    firstName: '',
    lastName: '',
    dob: null,
    gender: '',
    maritalStatus: '',
    qualifications: [],
    /////////////////////////////
    addressLine1: '',
    landmark: '',
    addressPinCode: '',
    personalInfoCity: '',
    personalInfoState: '',
    personalInfoCountry: '',
    residenceType: '',
    yearsLivinginCurrentAddress: ''
};
const App = () => {
    const [value, setValue] = useState(1000);
    const [loanTenure, setLoanTenure] = useState(12);
    const [selectedField, setSelectedField] = useState('');
    const [selectedFieldOthers, setSelectedFieldOthers] = useState('');
    const [emiPerMonths, setEmiPerMonths] = useState(12);
    const [formStep, setFormStep] = useState('initial');
    const [selectedEmploymentType, setSelectedEmploymentType] = useState('');

    const handleFormStep = (nextStep) => {
        setFormStep(nextStep);
    };
    // value={selectedMaritalValue} onChange={handleMaritalChange}
    const [selectedMaritalValue, setSelectedMaritalValue] = useState('');
    const handleMaritalChange = (event) => {
        setSelectedMaritalValue(event.target.value);
    };

    ////  dropdowns
    const [phoneNo, setPhoneNo] = useState();
    const [otp, setOtp] = useState();
    const [companyList, setCompanyList] = useState([]);
    const [companyType, setCompanyType] = useState('');
    const handleCompanyList = (event, value) => {
        setCompanyType(value?.value);
    };

    const [industryList, setIndustryList] = useState([]);
    const [industryType, setIndustryType] = useState('');
    const handleIndustryList = (event, value) => {
        setIndustryType(value?.value);
    };

    const [modeOfSalary, setModeOfSalary] = useState('');
    const handleModeOfSalary = (event) => {
        setModeOfSalary(event.target.value);
    };

    const [BankList, setBankList] = useState([]);
    const [bankAccountType, setBankAccountType] = useState('');
    console.log(bankAccountType, 'bankAccountType');
    const handleBankList = (event, value) => {
        setBankAccountType(value?.value);
    };

    const [ProfessionType, setProfessionType] = useState([]);
    const [ProfessionTypeList, setProfessionTypeList] = useState('');
    const handleProfessionType = (event, value) => {
        setProfessionTypeList(value?.value);
    };

    const [bankAccountWith, setBankAccountWith] = useState([]);
    const [currentAccountWith, setCurrentAccountWith] = useState('');
    const handleBankAccountWith = (event, value) => {
        setCurrentAccountWith(value?.value);
    };

    const [PrimaryBankAccount, setPrimaryBankAccount] = useState([]);
    const [primarySavingsBankAccount, setPrimarySavingsBankAccount] = useState('');
    const handlePrimaryBankAccountWith = (event, value) => {
        setPrimarySavingsBankAccount(value?.value);
    };

    const [BusinessRunBy, setBusinessRunBy] = useState([]);
    const [BusinessRunByList, setBusinessRunByList] = useState('');
    const handleBusinessRunBy = (event, value) => {
        setBusinessRunByList(value?.value);
    };
    const [BusinessType, setBusinessType] = useState([]);
    const [BusinessTypeList, setBusinessTypeList] = useState('');
    const handleBusinessType = (event, value) => {
        setBusinessTypeList(value?.value);
    };

    const [Qualifications, setQualifications] = useState([]);
    const [QualificationsList, setQualificationsList] = useState('');
    const handleQualifications = (event, value) => {
        setQualificationsList(value?.value);
    };
    const [Gender, setGender] = useState([]);
    const [genderList, setGenderList] = useState('');
    const handleGender = (event, value) => {
        setGenderList(value?.value);
    };
    const [residenceType, setResidenceType] = useState([]);
    const [residenceTypeList, setResidenceTypeList] = useState('');
    const handleResidenceType = (event, value) => {
        setResidenceTypeList(value?.value);
    };
    console.log(residenceType, 'residenceType');
    const [panCardDetails, setPanCard] = useState('');

    const [user, setUser] = useState([]);
    console.log(user, 'users');

    const [intrestedInLoasn, setIntrestedInLoasn] = useState([]);
    const handleintrestInGetingLoan = (event, value) => {
        setIntrestedInLoasn(value?.value);
    };

    const intrestInGetingLoan = [
        { label: 'Yes', value: 'Yes' },
        { label: 'No', value: 'No' }
    ];

    const handleChangeEmi = (event, newValue) => {
        setEmiPerMonths(newValue);
    };

    const handleChangeOthers = (event) => {
        setSelectedFieldOthers(event.target.value);
    };

    const handleChangeSelectedFeild = (event) => {
        setSelectedField(event.target.value);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleLoanTenureChange = (event, newValue) => {
        setLoanTenure(newValue);
    };

    const options = [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
        { label: 'Option 3', value: 'option3' },
        { label: 'Option 4', value: 'option4' }
    ];
    const years = [
        { label: '1 Year', value: '1 Year' },
        { label: '1-2 Years', value: '1-2 Years' },
        { label: '3 Years', value: '3 Years' },
        { label: '3-5 Years', value: '3-5 Years' },
        { label: '5+ Years', value: '5+ Years' }
    ];
    const [YearsCurrentProfession, setYearsCurrentProfession] = useState('');
    const handleYearList = (event, value) => {
        setYearsCurrentProfession(value?.value);
    };
    const otpSend = async () => {
        // const data = {
        //     contactNo: phoneNo,
        //     resend: false
        // };
        // const res = await sendOpt(data);
        // console.log(res);
        setFormStep('otp');
    };
    const otpValidate = async () => {
        const data = {
            contactNo: phoneNo,
            otp: otp
        };
        const res = await ValidateOtp(data);
        JwtService.setSession(res);
        console.log(res);
        // setFormStep('loanDetails');
    };

    const phoneNoHandler = (e) => {
        otpSend();
    };
    const otpHandler = (e) => {
        otpValidate();
        setFormStep('loanDetails');
    };

    const getCompanyList = async () => {
        const res = await getCompanyTypes();
        setCompanyList(res);
    };
    const getgetIndustryList = async () => {
        const res = await getIndustryTypes();
        setIndustryList(res);
    };
    const getBanksList = async () => {
        const res = await getBanks();
        setBankList(res);
    };
    const getProfessionList = async () => {
        const res = await getProfessionTypes();
        setProfessionType(res);
    };
    const getBankAccountWith = async () => {
        const res = await getBanks();
        setBankAccountWith(res);
    };
    const getPrimaryBankAccountWith = async () => {
        const res = await getBanks();
        setPrimaryBankAccount(res);
    };
    const getBusinessRunByOwner = async () => {
        const res = await getBusinessOwned();
        setBusinessRunBy(res);
    };
    const getBusinessType = async () => {
        const res = await getBusinessTypes();
        setBusinessType(res);
    };
    const getGenderType = async () => {
        const res = await getGenderTypes();
        setGender(res);
    };
    const getQualificationType = async () => {
        const res = await getQualifications();
        setQualifications(res);
    };
    const getResidenceType = async () => {
        const res = await getResidenceTypes();
        setResidenceType(res);
        console.log(res, 'res');
    };

    const getDetails = async () => {
        const data = {
            panCard: panCardDetails
        };
        const res = await getPrePopulateFormData(data);
        setUser(res.data);
        setFormStep('employmentType');
    };

    useEffect(() => {
        getCompanyList();
        getgetIndustryList();
        getBanksList();
        getProfessionList();
        getPrimaryBankAccountWith();
        getBusinessRunByOwner();
        getBusinessType();
        getGenderType();
        getQualificationType();
        getResidenceType();
    }, [null]);

    const onSubmit = (e) => {
        const initialValues = {
            data: {
                termsAndCondition: true,
                loan: {
                    reason: null,
                    amount: '',
                    tenure: ''
                },
                employmentType: selectedField,
                employmentDetails: {
                    companyTypeId: companyType,
                    industryTypeId: industryType,
                    companyName: e.companyName,
                    designation: e.designation,
                    address: e.addresss,
                    pinCode: e.companyPincode,
                    countryId: e.companyCountry,
                    stateId: e.companyState,
                    cityId: e.companyCity,
                    yearsWorkingIn: YearsCurrentProfession,
                    businessTypeId: BusinessTypeList,
                    professionTypeId: ProfessionTypeList,
                    turnover: null,
                    monthlyProfit: e.monthlyProfit,
                    income: null,
                    salaryMode: modeOfSalary,
                    bankId: '',
                    currentAccountBankId: currentAccountWith,
                    savingAccountBankId: primarySavingsBankAccount,
                    businessOwnedId: BusinessRunByList
                },
                personalInfo: {
                    emailId: e.email,
                    firstName: e.firstName,
                    lastName: e.lastName,
                    genderId: genderList,
                    dateOfBirth: e.dob,
                    qualificationId: QualificationsList,
                    maritalStatus: selectedMaritalValue
                },
                address: {
                    addressLine1: e.addressLine1,
                    addressLine2: e.landmark,
                    pinCode: e.addressPinCode,
                    countryId: e.personalInfoCountry,
                    stateId: e.personalInfoState,
                    cityId: e.personalInfoCity,
                    residenceTypeId: residenceTypeList,
                    yearsLivingIn: YearsCurrentProfession
                },
                finance: {
                    panCard: ''
                },
                others: {
                    totalEmiPaidMonthly: 0,
                    interestedToGetCreditCard: intrestedInLoasn
                },
                utm: {
                    id: '',
                    url: '',
                    source: '',
                    medium: '',
                    campaign: '',
                    term: '',
                    content: ''
                },
                extras: {
                    browser: '',
                    operatingSystem: '',
                    ipAddress: '',
                    timestamp: '',
                    userAgent: '',
                    location: ''
                }
            }
        };
        console.log('abhay', initialValues);
    };
    return (
        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}
        >
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
                <Form>
                    <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: '30vw' }}>
                        {formStep === 'initial' && (
                            <React.Fragment>
                                <Typography variant="h6">Enter your 10 digit mobile number to proceed: *</Typography> <br />
                                <Field
                                    component={TextField}
                                    name="phoneNumber"
                                    onChange={(e) => setPhoneNo(e.target.value)}
                                    label="Phone number"
                                />{' '}
                                <br />
                                <Button variant="contained" onClick={phoneNoHandler}>
                                    {' '}
                                    submit
                                </Button>{' '}
                                <br /> <br />
                                <Typography variant="h6">Enter 6 digit OTP received on your mobile</Typography> <br />
                                <Field
                                    component={TextField}
                                    name="otp"
                                    label="OTP"
                                    onChange={(e) => {
                                        setOtp(e.target.value);
                                    }}
                                />{' '}
                                <br />
                                <Button variant="contained" onClick={() => otpHandler()}>
                                    {' '}
                                    submit
                                </Button>{' '}
                            </React.Fragment>
                        )}
                        <br /> <br />
                        {formStep === 'loanDetails' && (
                            <React.Fragment>
                                <Typography variant="h5">Loan Details</Typography> <br />
                                <Typography variant="body1" align="center">
                                    Loan Amount: {value}
                                </Typography>
                                <Slider
                                    value={value}
                                    onChange={handleChange}
                                    aria-labelledby="range-slider"
                                    min={1000}
                                    max={1000000}
                                    step={1}
                                />{' '}
                                <br />
                                <Typography variant="body1" align="center">
                                    Loan Tenure: {loanTenure} months
                                </Typography>
                                <Slider
                                    value={loanTenure}
                                    onChange={handleLoanTenureChange}
                                    aria-labelledby="loan-tenure-slider"
                                    min={1}
                                    max={36}
                                    step={1}
                                />
                                <br />
                                <h6>QIPPS1951F</h6>
                                <Field
                                    component={TextField}
                                    onChange={(e) => {
                                        setPanCard(e.target.value);
                                    }}
                                    name="panCard"
                                    label="PAN Card "
                                />{' '}
                                <br />
                                <Field as={TextField} name="email" label="Email" type="email" /> <br />
                                <Button
                                    variant="outlined"
                                    onClick={() => {
                                        setFormStep('initial');
                                    }}
                                >
                                    previous
                                </Button>{' '}
                                <br />
                                <Button variant="contained" onClick={getDetails}>
                                    next
                                </Button>
                            </React.Fragment>
                        )}
                        <br /> <br /> <br />
                        {formStep === 'employmentType' && (
                            <React.Fragment>
                                <Typography variant="h5">Employment Type</Typography> <br />
                                <RadioGroup
                                    name="employmentType"
                                    value={selectedField}
                                    onChange={(e) => {
                                        setSelectedEmploymentType(e.target.value);
                                        handleChangeSelectedFeild(e);
                                    }}
                                >
                                    <FormControlLabel value="Salaried" control={<Radio />} label="Salaried" />
                                    <FormControlLabel
                                        value="SelfEmployedprofessional"
                                        control={<Radio />}
                                        label="Self Employed professional"
                                    />
                                    <FormControlLabel value="Self Employed" control={<Radio />} label="Self Employed" />
                                    <FormControlLabel value="Others" control={<Radio />} label="Others" />
                                </RadioGroup>
                                <br />
                                <Button
                                    variant="outlined"
                                    onClick={() => {
                                        setFormStep('loanDetails');
                                    }}
                                >
                                    previous
                                </Button>
                                <br />
                                <Button
                                    variant="contained"
                                    onClick={() => {
                                        setFormStep('employmentDetails');
                                    }}
                                >
                                    {' '}
                                    next
                                </Button>
                                <br />
                            </React.Fragment>
                        )}
                        {formStep === 'employmentDetails' && (
                            <React.Fragment>
                                {selectedEmploymentType === 'Salaried' && (
                                    <React.Fragment>
                                        <Typography variant="h5">Salaried</Typography> <br />
                                        <br />
                                        <Autocomplete
                                            disablePortal
                                            id="combo-box-demo"
                                            name="companyType"
                                            onChange={handleCompanyList}
                                            options={companyList}
                                            fullWidth
                                            renderInput={(params) => <TextField {...params} label="Company Type" />}
                                        />
                                        <br />
                                        <Autocomplete
                                            disablePortal
                                            id="combo-box-demo"
                                            name="Bank Name"
                                            onChange={handleIndustryList}
                                            options={industryList}
                                            fullWidth
                                            renderInput={(params) => <TextField {...params} label="Industry" />}
                                        />
                                        <br />
                                        <Field as={TextField} name="designation" label="Designation" /> <br />
                                        <Field as={TextField} name="companyName" label="Company Name" /> <br />
                                        <Field as={TextField} name="addresss" label="Company Address" /> <br />
                                        <Field as={TextField} name="companyPincode" label="Company Pincode" /> <br />
                                        <Field as={TextField} name="companyCity" label="City" /> <br />
                                        <Field as={TextField} name="companyState" label="State" /> <br />
                                        <Field as={TextField} name="companyCountry" label="Country" /> <br />
                                        <Autocomplete
                                            disablePortal
                                            id="combo-box-demo"
                                            name="bankAccount"
                                            onChange={handleYearList}
                                            options={years}
                                            fullWidth
                                            renderInput={(params) => (
                                                <TextField {...params} label="How Many Years You Are Working in Current Company? *" />
                                            )}
                                        />{' '}
                                        <br />
                                        <Field as={TextField} name="monthlyProfit" label="Monthly Income" /> <br />
                                        <Typography> mode of salary</Typography>
                                        <br />
                                        <RadioGroup value={modeOfSalary} onChange={handleModeOfSalary}>
                                            <FormControlLabel value="Bank Transfer" control={<Radio />} label="Bank Transfer" />
                                            <FormControlLabel value="Cash" control={<Radio />} label="Cash" />
                                        </RadioGroup>
                                        <Autocomplete
                                            disablePortal
                                            id="combo-box-demo"
                                            name="bankAccount"
                                            onChange={handleBankList}
                                            options={BankList}
                                            fullWidth
                                            renderInput={(params) => <TextField {...params} label="Bank Account" />}
                                        />{' '}
                                        <br />
                                        <Button
                                            variant="outlined"
                                            onClick={() => {
                                                setFormStep('employmentType');
                                            }}
                                        >
                                            previous
                                        </Button>
                                        <br />
                                        <Button
                                            variant="outlined"
                                            onClick={() => {
                                                setFormStep('personalDetails');
                                            }}
                                        >
                                            next
                                        </Button>
                                    </React.Fragment>
                                )}
                                {selectedEmploymentType === 'SelfEmployedprofessional' && (
                                    <React.Fragment>
                                        <Typography variant="h5">Self Employed- Professional</Typography>
                                        <br />
                                        <Autocomplete
                                            disablePortal
                                            id="combo-box-demo"
                                            name="yearsCurrentProfession"
                                            onChange={handleYearList}
                                            options={years}
                                            fullWidth
                                            renderInput={(params) => <TextField {...params} label="Years Current Profession" />}
                                        />{' '}
                                        <br />
                                        <Autocomplete
                                            disablePortal
                                            id="combo-box-demo"
                                            name="primarySavingsBankAccount"
                                            options={ProfessionType}
                                            onChange={handleProfessionType}
                                            fullWidth
                                            renderInput={(params) => <TextField {...params} label="Profession Type" />}
                                        />{' '}
                                        <br />
                                        <Field as={TextField} name="companyName" label="Company Name" />
                                        <br />
                                        <Field as={TextField} name="companyAddress" label="Company Address" />
                                        <br />
                                        <Field as={TextField} name="companyPinCode" label="Company Pin Code" />
                                        <br />
                                        <Field as={TextField} name="companyCity" label="Company City" />
                                        <br />
                                        <Field as={TextField} name="companyState" label="Company State" />
                                        <br />
                                        <Field as={TextField} name="companyCountry" label="Company Country" />
                                        <br />
                                        <Field as={TextField} name="designation" label="Designation" />
                                        <br />
                                        <Field as={TextField} name="turnover" label="Turnover" />
                                        <br />
                                        <Field as={TextField} name="monthlyProfit" label="Monthly Profit" />
                                        <br />
                                        <Autocomplete
                                            disablePortal
                                            id="combo-box-demo"
                                            name="businessAccountWith"
                                            options={PrimaryBankAccount}
                                            onChange={handleBankAccountWith}
                                            fullWidth
                                            renderInput={(params) => <TextField {...params} label="Bank List" />}
                                        />{' '}
                                        <br />
                                        <Autocomplete
                                            disablePortal
                                            id="combo-box-demo"
                                            name="primarySavingsBankAccount"
                                            options={PrimaryBankAccount}
                                            onChange={handlePrimaryBankAccountWith}
                                            fullWidth
                                            renderInput={(params) => <TextField {...params} label="primary Savings Bank Account" />}
                                        />{' '}
                                        <br />
                                        <Button
                                            variant="outlined"
                                            onClick={() => {
                                                setFormStep('employmentType');
                                            }}
                                        >
                                            previous
                                        </Button>
                                        <br />
                                        <Button
                                            variant="outlined"
                                            onClick={() => {
                                                setFormStep('personalDetails');
                                            }}
                                        >
                                            next
                                        </Button>
                                    </React.Fragment>
                                )}
                                {selectedEmploymentType === 'Self Employed' && (
                                    <React.Fragment>
                                        <Typography variant="h5">Bussiness</Typography>
                                        <br />
                                        <Autocomplete
                                            disablePortal
                                            id="combo-box-demo"
                                            name="primarySavingsBankAccount"
                                            options={BusinessRunBy}
                                            onChange={handleBusinessRunBy}
                                            fullWidth
                                            renderInput={(params) => <TextField {...params} label="Business Run By*" />}
                                        />{' '}
                                        <br />
                                        <Autocomplete
                                            disablePortal
                                            id="combo-box-demo"
                                            name="yearsCurrentBusiness"
                                            onChange={handleYearList}
                                            options={years}
                                            fullWidth
                                            renderInput={(params) => (
                                                <TextField {...params} label="How Many Years You Are Working in Current Business?*" />
                                            )}
                                        />{' '}
                                        <br />
                                        <Autocomplete
                                            disablePortal
                                            id="combo-box-demo"
                                            name="businessType"
                                            options={BusinessType}
                                            onChange={handleBusinessType}
                                            fullWidth
                                            renderInput={(params) => <TextField {...params} label="Business Type*" />}
                                        />{' '}
                                        <br />
                                        <Autocomplete
                                            disablePortal
                                            id="combo-box-demo"
                                            name="industry"
                                            options={industryList}
                                            onChange={handleIndustryList}
                                            fullWidth
                                            renderInput={(params) => <TextField {...params} label="Industry *" />}
                                        />{' '}
                                        <br />
                                        <Field as={TextField} name="companyName" label="Company Name" /> <br />
                                        <Field as={TextField} name="companyAddress" label="Company Address" /> <br />
                                        <Field as={TextField} name="companyPincode" label="Business Company Pincode" /> <br />
                                        <Field as={TextField} name="companyCity" label="Business Company City" /> <br />
                                        <Field as={TextField} name="companyState" label="Business Company State" /> <br />
                                        <Field as={TextField} name="companyCountry" label="Business Company Country" /> <br />
                                        <Field as={TextField} name="designation" label="Business Designation" /> <br />
                                        <Field as={TextField} name="businessTurnover" label="Business Turnover" /> <br />
                                        <Field as={TextField} name="businessMonthlyProfit" label="Business Monthly Profit" /> <br />
                                        <Autocomplete
                                            disablePortal
                                            id="combo-box-demo"
                                            name="businessAccountWith"
                                            options={PrimaryBankAccount}
                                            onChange={handleBankAccountWith}
                                            fullWidth
                                            renderInput={(params) => <TextField {...params} label="Business/Current Account Is With? *" />}
                                        />{' '}
                                        <br />
                                        <Autocomplete
                                            disablePortal
                                            id="combo-box-demo"
                                            name="primarySavingsBankAccount"
                                            options={PrimaryBankAccount}
                                            onChange={handlePrimaryBankAccountWith}
                                            fullWidth
                                            renderInput={(params) => (
                                                <TextField {...params} label="Primary/Savings Bank Account Is With? *" />
                                            )}
                                        />{' '}
                                        <br />
                                        <Button
                                            variant="outlined"
                                            onClick={() => {
                                                setFormStep('employmentType');
                                            }}
                                        >
                                            previous
                                        </Button>
                                        <br />
                                        <Button
                                            variant="outlined"
                                            onClick={() => {
                                                setFormStep('personalDetails');
                                            }}
                                        >
                                            next
                                        </Button>
                                    </React.Fragment>
                                )}
                                {selectedEmploymentType === 'Others' && (
                                    <React.Fragment>
                                        <Typography variant="h5">Others</Typography>
                                        <br />
                                        <RadioGroup value={selectedFieldOthers} onChange={handleChangeOthers}>
                                            <FormControlLabel value="student" control={<Radio />} label="Student" />
                                            <FormControlLabel value="jobSeeker" control={<Radio />} label="Job Seeker" />
                                            <FormControlLabel value="retired" control={<Radio />} label="Retired" />
                                            <FormControlLabel value="homemaker" control={<Radio />} label="Homemaker" />
                                            <FormControlLabel value="other" control={<Radio />} label="Other" />
                                        </RadioGroup>
                                        <br />
                                        <Button
                                            variant="outlined"
                                            onClick={() => {
                                                setFormStep('employmentType');
                                            }}
                                        >
                                            previous
                                        </Button>
                                        <br />
                                        <Button
                                            variant="outlined"
                                            onClick={() => {
                                                setFormStep('personalDetails');
                                            }}
                                        >
                                            next
                                        </Button>
                                    </React.Fragment>
                                )}
                            </React.Fragment>
                        )}
                        {formStep === 'personalDetails' && (
                            <React.Fragment>
                                <Typography variant="h5">Personal Details</Typography>
                                <br />
                                <Field as={TextField} name="firstName" label="First Name" /> <br />
                                <Field as={TextField} name="lastName" label="Last Name" /> <br />
                                <Field
                                    as={TextField}
                                    name="dob"
                                    label="Date of Birth"
                                    type="date"
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                />{' '}
                                <br />
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    name="gender"
                                    options={Gender}
                                    onChange={handleGender}
                                    fullWidth
                                    renderInput={(params) => <TextField {...params} label="gender" />}
                                />{' '}
                                <br />
                                <Typography>Marital Status *</Typography>
                                <RadioGroup value={selectedMaritalValue} onChange={handleMaritalChange}>
                                    <FormControlLabel value="Single" control={<Radio />} label="Single" />
                                    <FormControlLabel value="Married" control={<Radio />} label="Married" />
                                </RadioGroup>
                                <br />
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    name="Qualifications"
                                    options={Qualifications}
                                    onChange={handleQualifications}
                                    fullWidth
                                    renderInput={(params) => <TextField {...params} label="Qualifications *" />}
                                />{' '}
                                <br />
                                <Button
                                    variant="outlined"
                                    onClick={() => {
                                        setFormStep('employmentDetails');
                                    }}
                                >
                                    previous
                                </Button>
                                <br />
                                <Button
                                    variant="outlined"
                                    onClick={() => {
                                        setFormStep('address');
                                    }}
                                >
                                    next
                                </Button>
                            </React.Fragment>
                        )}
                        {/* Address */}
                        {formStep === 'address' && (
                            <React.Fragment>
                                <Typography variant="h5">Address Details </Typography>
                                <br />
                                <Field as={TextField} name="addressLine1" label="Address Line 1" fullWidth />
                                <br />
                                <Field as={TextField} name="landmark" label="Landmark" fullWidth />
                                <br />
                                <Field as={TextField} name="addressPinCode" label="Address Pin Code" fullWidth />
                                <br />
                                <Field as={TextField} name="personalInfoCity" label="City" fullWidth />
                                <br />
                                <Field as={TextField} name="personalInfoState" label="State" fullWidth />
                                <br />
                                <Field as={TextField} name="personalInfoCountry" label="Country" fullWidth />
                                <br />
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    name="residenceType"
                                    options={residenceType}
                                    onChange={handleResidenceType}
                                    fullWidth
                                    renderInput={(params) => <TextField {...params} label="Residence Type" />}
                                />{' '}
                                <br />
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    name="yearsLivinginCurrentAddress"
                                    options={years}
                                    onChange={handleYearList}
                                    fullWidth
                                    renderInput={(params) => (
                                        <TextField {...params} label="How Many Years You Are Living in Current Address?" />
                                    )}
                                />{' '}
                                <br />
                                <Button
                                    variant="outlined"
                                    onClick={() => {
                                        setFormStep('personalDetails');
                                    }}
                                >
                                    previous
                                </Button>
                                <br />
                                <Button
                                    variant="outlined"
                                    onClick={() => {
                                        setFormStep('submit');
                                    }}
                                >
                                    next
                                </Button>
                            </React.Fragment>
                        )}
                        {formStep === 'submit' && (
                            <React.Fragment>
                                <Typography variant="h5">Other Details</Typography> <br />
                                <br />
                                <Typography variant="body1" align="center">
                                    Total EMI Pay currently Per Month: {emiPerMonths}
                                </Typography>
                                <Slider
                                    value={emiPerMonths}
                                    onChange={handleChangeEmi}
                                    aria-labelledby="loan-tenure-slider"
                                    min={0}
                                    max={500000}
                                    step={1}
                                />
                                <br />
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    name="businessAccountWith"
                                    options={intrestInGetingLoan}
                                    onChange={handleintrestInGetingLoan}
                                    fullWidth
                                    renderInput={(params) => (
                                        <TextField {...params} label="Are you interested in getting any credit card? *" />
                                    )}
                                />{' '}
                                <br />
                                <Button variant="outlined" type="submit">
                                    Submit
                                </Button>
                            </React.Fragment>
                        )}
                    </Box>
                </Form>
            </Formik>
        </Box>
    );
};

export default App;
