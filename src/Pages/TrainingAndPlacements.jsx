import React, { useState, useMemo } from 'react'
import styled, { css } from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'

// --- MOCK DATA ---

const jobData = [
  {
    id: 1,
    company: 'HDFC Bank',
    title: 'Deputy Manager Operational',
    qualification: 'Graduation Any Stream 50%',
    ageLimit: '21-28',
    salary: '₹ 5,59,000/-',
    location: 'Pan India',
    trainingFee: '₹ 3,50,000/- (Finance Facilities available for ₹ 2,57,000/-)',
    selectionProcess:
      '1. Online Application, 2. Online Exam, 3. Online Interview, 4. Get Offer Letter',
    trainingPeriod: '4 Months',
  },
  {
    id: 2,
    company: 'HDFC Bank',
    title: 'Assistant Manager Operational',
    qualification: 'Graduation Any Stream 50%',
    ageLimit: '21-28',
    salary: '₹ 4,40,000/-',
    location: 'Pan India',
    trainingFee: '₹ 2,50,000/- (Finance Facilities available for ₹ 1,50,000/-)',
    selectionProcess:
      '1. Online Application, 2. Online Exam, 3. Online Interview, 4. Get Offer Letter',
    trainingPeriod: '45 Days',
  },
  {
    id: 3,
    company: 'HDFC Bank',
    title: 'Relationship Manager',
    qualification: 'Graduation Any Stream 50%',
    ageLimit: '21-32',
    salary: '₹ 2,08,000 - 3,00,000/-',
    location: 'Pan India',
    trainingFee: '₹ 59,000/- (Application Fee: ₹ 68,000/-)',
    selectionProcess:
      '1. Online Application, 2. Online Exam, 3. Online Interview, 4. Get Offer Letter',
    trainingPeriod: '7 Days',
  },
  {
    id: 4,
    company: 'HDFC Bank',
    title: 'Sales officer CASA',
    qualification: 'Graduation Any Stream 50%',
    ageLimit: '21-32',
    salary: '₹ 2,08,000 - 2,80,000/-',
    location: 'Pan India',
    trainingFee: '₹ 29,000/- (Application Fee: ₹ 49,000/-)',
    selectionProcess:
      '1. Online Application, 2. Online Exam, 3. Online Interview, 4. Get Offer Letter',
    trainingPeriod: '7 Days',
  },
  {
    id: 5,
    company: 'HDFC Life',
    title: 'CA Manager Operational',
    qualification: 'Graduation Any Stream 50%',
    ageLimit: '21-35',
    salary: '₹ 4,00,000/-',
    location: 'Pan India',
    trainingFee: '₹ 1,50,000/- (Application Fee: ₹ 88,500/- + GST)',
    selectionProcess:
      '1. Online Application, 2. Online Exam, 3. Online Interview, 4. Get Offer Letter',
    trainingPeriod: '4 Months',
  },
  {
    id: 6,
    company: 'HDFC Bank',
    title: 'VRM Operational',
    qualification: 'Graduation Any Stream 50%',
    ageLimit: '21-32',
    salary: '₹ 3,00,000 - 4,50,000/-',
    location: 'Pan India',
    trainingFee: '₹ 99,000/- (Application Fee: ₹ 1,20,000/-)',
    selectionProcess:
      '1. Online Application, 2. Online Exam, 3. Online Interview, 4. Get Offer Letter',
    trainingPeriod: '3 Months',
  },
  {
    id: 7,
    company: 'HDFC Bank',
    title: "Manager's Operational",
    qualification: 'Graduation Any Stream 50%',
    ageLimit: '21-32',
    salary: '₹ 4,00,000 - 9,00,000/-',
    location: 'Pan India',
    trainingFee: '₹ 1,50,000/- (Finance Facilities available)',
    selectionProcess:
      '1. Online Application, 2. Online Exam, 3. Online Interview, 4. Get Offer Letter',
    trainingPeriod: '3-6 Months',
  },
  {
    id: 8,
    company: 'AXIS BANK',
    title: 'Assistant Manager PO',
    qualification: 'Graduation Any Stream 50%',
    ageLimit: '21-35',
    salary: '₹ 4,46,000/-',
    location: 'Pan India',
    trainingFee: '₹ 2,50,000/- (Finance Facilities available for ₹ 2,80,000/-)',
    selectionProcess:
      '1. Online Application, 2. Online Exam, 3. Online Interview, 4. Get Offer Letter',
    trainingPeriod: '4 Months',
  },
  {
    id: 9,
    company: 'AXIS BANK',
    title: 'Assistant Manager PO Female',
    qualification: 'Graduation Any Stream 60%',
    ageLimit: '21-30',
    salary: '₹ 4,42,000/-',
    location: 'Pan India',
    trainingFee: '₹ 1,50,000/- (Finance Facilities available for ₹ 1,65,000/-)',
    selectionProcess:
      '1. Online Application, 2. Online Exam, 3. Online Interview, 4. Get Offer Letter',
    trainingPeriod: '45 Days',
  },
  {
    id: 10,
    company: 'AXIS BANK',
    title: 'Assistant Manager AM',
    qualification: 'Graduation Any Stream 50%',
    ageLimit: '19-35',
    salary: '₹ 4,50,000/-',
    location: 'Pan India',
    trainingFee: '₹ 2,00,000/- (Finance Facilities available for ₹ 2,35,000/-)',
    selectionProcess:
      '1. Online Application, 2. Online Exam, 3. Online Interview, 4. Get Offer Letter',
    trainingPeriod: '4 Months',
  },
  {
    id: 11,
    company: 'AXIS Bank',
    title: 'Business Development Executive',
    qualification: 'Graduation Any Stream 50%',
    ageLimit: '18-30',
    salary: '₹ 2,28,000 - 3,36,000/-',
    location: 'Pan India',
    trainingFee: '₹ 99,000/- (Application Fee: ₹ 65,000/-)',
    selectionProcess:
      '1. Online Application, 2. Online Exam, 3. Online Interview, 4. Get Offer Letter',
    trainingPeriod: '7 Days',
  },
  {
    id: 12,
    company: 'SBI General Insurance',
    title: 'Relationship Manager Branch Chanel',
    qualification: 'Graduation Any Stream 50%',
    ageLimit: '21-27',
    salary: '₹ 3,50,000/-',
    location: 'Pan India',
    trainingFee: '₹ 1,70,000/- (Application Fee: ₹ 99,000/-)',
    selectionProcess:
      '1. Online Application, 2. Online Exam, 3. Online Interview, 4. Get Offer Letter',
    trainingPeriod: '1 Month',
  },
  {
    id: 14,
    company: 'Bank Of India Star Union',
    title: 'Relationship Manager Branch Chanel',
    qualification: 'Graduation Any Stream 2021-2024',
    ageLimit: '18-37',
    salary: '₹ 3,50,000/-',
    location: 'Pan India',
    trainingFee: '₹ 1,70,000/- (Application Fee: ₹ 99,000/-)',
    selectionProcess:
      '1. Online Application, 2. Online Exam, 3. Online Interview, 4. Get Offer Letter',
    trainingPeriod: '1 Month Online',
  },
  {
    id: 15,
    company: 'Mahindra Finance',
    title: 'Business Executive Female Only',
    qualification: 'Graduation Any Stream 50%',
    ageLimit: '19-28',
    salary: '₹ 4,70,000/-',
    location: 'Pan India',
    trainingFee: '₹ 1,70,000/- (Application Fee: ₹ 42,000/- + GST)',
    selectionProcess:
      '1. Online Application, 2. Online Exam, 3. Online Interview, 4. Get Offer Letter',
    trainingPeriod: '1 Month Online',
  },
  {
    id: 16,
    company: 'TATA AIG',
    title: 'Channel Sales Manager',
    qualification: 'Graduation Any Stream 50%',
    ageLimit: '21-28',
    salary: '₹ 4,00,000/-',
    location: 'Pan India',
    trainingFee: '₹ 1,50,000/- (Application Fee: ₹ 99,000/- + GST)',
    selectionProcess:
      '1. Online Application, 2. Online Exam, 3. Online Interview, 4. Get Offer Letter',
    trainingPeriod: '5 Months',
  },
  {
    id: 17,
    company: 'JANA Small Finance Bank',
    title: 'Assistant Manager',
    qualification: 'Graduation Any Stream 50%',
    ageLimit: '21-30',
    salary: '₹ 4,00,000/- + PLP',
    location: 'Pan India',
    trainingFee: '₹ 1,95,000/- (Application Fee: ₹ 99,000/- + GST)',
    selectionProcess:
      '1. Online Application, 2. Online Exam, 3. Online Interview, 4. Get Offer Letter',
    trainingPeriod: '1.5 Months',
  },
  {
    id: 18,
    company: 'AU Small Finance Bank',
    title: 'Bank Officer',
    qualification: 'Graduation Any Stream 50%',
    ageLimit: '21-32',
    salary: '₹ 3,50,000 - 7,00,000/-',
    location: 'Pan India',
    trainingFee: '₹ 2,50,000/- (Application Fee: ₹ 2,00,000/- + GST Loan)',
    selectionProcess:
      '1. Online Application, 2. Online Exam, 3. Online Interview, 4. Get Offer Letter',
    trainingPeriod: '3 Months',
  },
  {
    id: 19,
    company: 'Green Finch',
    title: 'Credit Associate',
    qualification: 'Graduation Any Stream 50%',
    ageLimit: '21-37',
    salary: '₹ 3,43,000/-',
    location: 'Pan India',
    trainingFee: '₹ 1,65,000/- (Application Fee: ₹ 82,000/- + GST Loan)',
    selectionProcess:
      '1. Online Application, 2. Online Exam, 3. Online Interview, 4. Get Offer Letter',
    trainingPeriod: '45 Days',
  },
  {
    id: 20,
    company: 'Bandhan Bank',
    title: 'Branch Sales Executive',
    qualification: 'Graduation Any Stream 50%',
    ageLimit: '21-31',
    salary: '₹ 2,38,000 - 3,16,000/-',
    location: 'Pan India',
    trainingFee: '₹ 49,000/- (Application Fee: ₹ 90,000/-)',
    selectionProcess:
      '1. Online Application, 2. Online Exam, 3. Online Interview, 4. Get Offer Letter',
    trainingPeriod: '15-30 Days',
  },
  {
    id: 21,
    company: 'Bandhan Bank',
    title: 'VRM Operational',
    qualification: 'Graduation Any Stream 50%',
    ageLimit: '21-32',
    salary: '₹ 3,00,000/-',
    location: 'Pan India',
    trainingFee: '₹ 99,000/- (Application Fee: ₹ 1,20,000/-)',
    selectionProcess:
      '1. Online Application, 2. Online Exam, 3. Online Interview, 4. Get Offer Letter',
    trainingPeriod: '1 Month Online',
  },
  {
    id: 22,
    company: 'ICICI Bank',
    title: 'Deputy Manager',
    qualification: 'Graduation Any Stream 50%',
    ageLimit: '19-27',
    salary: '₹ 5,02,000 - 5,50,000/- (Tab Free)',
    location: 'Pan India',
    trainingFee: '₹ 3,50,000/- (Application Fee: ₹ 2,55,000/- + GST Loan)',
    selectionProcess:
      '1. Online Application, 2. Online Exam, 3. Online Interview, 4. Get Offer Letter',
    trainingPeriod: '4 Months',
  },
  {
    id: 23,
    company: 'ICICI Bank',
    title: 'Relationship Manager Branch Chanel',
    qualification: 'Graduation Any Stream 50%',
    ageLimit: '18-26',
    salary: '₹ 3,00,000 - 3,50,000/-',
    location: 'Pan India',
    trainingFee: '₹ 90,000/- (Application Fee: ₹ 65,000/- + GST)',
    selectionProcess:
      '1. Online Application, 2. Online Exam, 3. Online Interview, 4. Get Offer Letter',
    trainingPeriod: '21 Days Online',
  },
  {
    id: 24,
    company: 'ICICI Bank',
    title: 'Sales Executive',
    qualification: 'Graduation Any Stream 50%',
    ageLimit: '18-30',
    salary: '₹ 2,28,000 - 3,36,000/-',
    location: 'Pan India',
    trainingFee: '₹ 49,000/- (Application Fee: ₹ 49,000/-)',
    selectionProcess:
      '1. Online Application, 2. Online Exam, 3. Online Interview, 4. Get Offer Letter',
    trainingPeriod: '15 Days Online',
  },
  {
    id: 25,
    company: 'Muthooth Finance',
    title: 'CSE',
    qualification: 'Graduation Any Stream',
    ageLimit: '18-28',
    salary: '₹ 1,80,000/-',
    location: 'Pan India',
    trainingFee: '₹ 85,000/- (Application Fee: ₹ 49,000/-)',
    selectionProcess:
      '1. Online Application, 2. Online Exam, 3. Online Interview, 4. Get Offer Letter',
    trainingPeriod: '7 Days Online',
  },
  {
    id: 26,
    company: 'Muthooth Fincorp',
    title: 'BDE',
    qualification: 'Graduation Any Stream',
    ageLimit: '18-28',
    salary: '₹ 2,50,000/-',
    location: 'Pan India',
    trainingFee: '₹ 85,000/- (Application Fee: ₹ 65,000/-)',
    selectionProcess:
      '1. Online Application, 2. Online Exam, 3. Online Interview, 4. Get Offer Letter',
    trainingPeriod: '7 Days Online',
  },
  {
    id: 27,
    company: 'Utkarsh Bank',
    title: 'TCO & PCO',
    qualification: '12th Pass',
    ageLimit: '18-32',
    salary: '₹ 2,50,000 - 3,00,000/-',
    location: 'Pan India',
    trainingFee: '₹ 90,000/-',
    selectionProcess:
      '1. Online Application, 2. Online Exam, 3. Online Interview, 4. Get Offer Letter',
    trainingPeriod: '1 Month (Lodging & Fooding included)',
  },
  {
    id: 28,
    company: 'Utkarsh Bank',
    title: 'Cashier CSO',
    qualification: 'Graduation Any Stream',
    ageLimit: '18-28',
    salary: '₹ 2,50,000/- (Room Free)',
    location: 'Pan India',
    trainingFee: '₹ 90,000/-',
    selectionProcess:
      '1. Online Application, 2. Online Exam, 3. Online Interview, 4. Get Offer Letter (Fooding and Lodging Free)',
    trainingPeriod: '15-30 Days Online',
  },
  {
    id: 29,
    company: 'SAFEXPRESS Logistic',
    title: 'Office Assistant',
    qualification: '12th Pass',
    ageLimit: '18-32',
    salary: '₹ 2,00,000 - 2,50,000/-',
    location: 'Pan India',
    trainingFee: '₹ 75,000/- (Application Fee: ₹ 40,000/-)',
    selectionProcess:
      '1. Online Application, 2. Online Exam, 3. Online Interview, 4. Get Offer Letter',
    trainingPeriod: '7-10 Days',
  },
  {
    id: 30,
    company: 'Max Hospital',
    title: 'Frontline Billing Operational',
    qualification: '12th Pass',
    ageLimit: '18-32',
    salary: '₹ 2,40,000 - 3,00,000/-',
    location: 'Pan India',
    trainingFee: '₹ 80,000/- (Application Fee: ₹ 40,000/-)',
    selectionProcess:
      '1. Online Application, 2. Online Exam, 3. Online Interview, 4. Get Offer Letter',
    trainingPeriod: '2-4 Months',
  },
  {
    id: 31,
    company: 'Medanta Hospital',
    title: 'Frontline Billing Operational',
    qualification: '12th Pass',
    ageLimit: '18-32',
    salary: '₹ 2,40,000 - 3,00,000/-',
    location: 'Pan India',
    trainingFee: '₹ 80,000/- (Application Fee: ₹ 40,000/-)',
    selectionProcess:
      '1. Online Application, 2. Online Exam, 3. Online Interview, 4. Get Offer Letter',
    trainingPeriod: '2-4 Months',
  },
  {
    id: 32,
    company: 'Paras Hospital',
    title: 'Frontline Billing Operational',
    qualification: '12th Pass',
    ageLimit: '18-32',
    salary: '₹ 2,40,000 - 3,00,000/-',
    location: 'Pan India',
    trainingFee: '₹ 80,000/- (Application Fee: ₹ 40,000/-)',
    selectionProcess:
      '1. Online Application, 2. Online Exam, 3. Online Interview, 4. Get Offer Letter',
    trainingPeriod: '2-4 Months',
  },
  {
    id: 33,
    company: 'Kotak Mahindra Bank',
    title: 'BRSM AS Deputy Manager',
    qualification: 'Graduation Any Stream 50%',
    ageLimit: '21-27',
    salary: '₹ 5,00,000/-',
    location: 'Pan India',
    trainingFee: '₹ 3,00,000/- (Application Fee: ₹ 2,80,000/- + GST)',
    selectionProcess:
      '1. Online Application, 2. Online Exam, 3. Online Interview, 4. Get Offer Letter',
    trainingPeriod: '4 Months',
  },
  {
    id: 34,
    company: 'GLOBLE ACCA CMA',
    title: 'Global CA (180 Countrys)',
    qualification: '12th & Graduation Any Stream',
    ageLimit: '18-45',
    salary: '₹ 8,00,000 - 24,00,000/-',
    location: 'Global Work From Home',
    trainingFee: '₹ 1,50,000/- (Application Fee: ₹ 1,60,000 - 2,50,000/-)',
    selectionProcess:
      '1. Online Application, 2. Online Exam, 3. Online Interview, 4. Get Offer Letter',
    trainingPeriod: '6-11 Months Online',
  },
  {
    id: 35,
    company: 'CITI, KPMG, EY, YES, IBM, WIPRO, INFOSYS',
    title: 'Financial Planning, AM, Analyst',
    qualification: 'Graduation Any Stream 50%',
    ageLimit: '18-32',
    salary: '₹ 4,00,000/-',
    location: 'Pan India',
    trainingFee: '₹ 1,50,000/- (Application Fee: ₹ 1,20,000/- + GST)',
    selectionProcess:
      '1. Online Application, 2. Online Exam, 3. Online Interview, 4. Get Offer Letter',
    trainingPeriod: '3-6 Months Online',
  },
  {
    id: 36,
    company: 'DCB, JP Morgan, ICICI, Barclays, HSBC',
    title: 'Clearing Settlement, Onboarding Associate',
    qualification: 'Graduation Any Stream 50%',
    ageLimit: '18-32',
    salary: '₹ 4,00,000 - 9,00,000/-',
    location: 'Pan India',
    trainingFee: '₹ 2,00,000/- (Application Fee: ₹ 1,50,000/- + GST)',
    selectionProcess:
      '1. Online Application, 2. Online Exam, 3. Online Interview, 4. Get Offer Letter',
    trainingPeriod: '3-6 Months',
  },
  {
    id: 37,
    company: 'Pay U, CITI BANK, GENPACT, YES BANK, WIPRO',
    title: 'Investment Banking Associate',
    qualification: 'Graduation Any Stream',
    ageLimit: '18-32',
    salary: '₹ 2,64,000/-',
    location: 'Pan India',
    trainingFee: '₹ 85,000/- (Application Fee: ₹ 60,000/- + 18% GST)',
    selectionProcess:
      '1. Online Application, 2. Online Exam, 3. Online Interview, 4. Get Offer Letter',
    trainingPeriod: '3-3 Months',
  },
  {
    id: 38,
    company: 'Lenskart (Non-Sales)',
    title: 'Dispensing Optician, Store Executive',
    qualification: '12th Pass',
    ageLimit: '18-40',
    salary: '₹ 2,50,000 - 3,00,000/-',
    location: 'Pan India',
    trainingFee: '₹ 90,000/- (Application Fee: ₹ 1,50,000/-)',
    selectionProcess:
      '1. Online Application, 2. Online Exam, 3. Online Interview, 4. Get Offer Letter',
    trainingPeriod: '3-6 Months',
  },
  {
    id: 39,
    company: "Domino's",
    title: 'Store Executive',
    qualification: '12th Pass',
    ageLimit: '18-40',
    salary: '₹ 2,50,000 - 3,00,000/-',
    location: 'Pan India',
    trainingFee: '₹ 90,000/- (Application Fee: ₹ 1,50,000/-)',
    selectionProcess:
      '1. Online Application, 2. Online Exam, 3. Online Interview, 4. Get Offer Letter',
    trainingPeriod: '3-6 Months',
  },
  {
    id: 40,
    company: 'Radisson Blu Hotel',
    title: 'Store Executive',
    qualification: '12th Pass',
    ageLimit: '18-40',
    salary: '₹ 2,50,000 - 3,00,000/-',
    location: 'Pan India',
    trainingFee: '₹ 99,000/- (Application Fee: ₹ 1,50,000/-)',
    selectionProcess:
      '1. Online Application, 2. Online Exam, 3. Online Interview, 4. Get Offer Letter',
    trainingPeriod: '3-6 Months',
  },
  {
    id: 41,
    company: 'Seairo Shipping Logistics',
    title: 'Supply Chain Management Logistics',
    qualification: 'BBA/MBA',
    ageLimit: '21-32',
    salary: '₹ 7,00,000/- (Stipend: 18,000 PM for 6 Months)',
    location: 'Pan India',
    trainingFee: '₹ 1,70,000/- (Application Fee: ₹ 90,000/-)',
    selectionProcess:
      '1. Online Application, 2. Online Exam, 3. Online Interview, 4. Get Offer Letter',
    trainingPeriod: '6 Month Working Training',
  },
  {
    id: 42,
    company: 'Seairo Shipping Logistics',
    title: 'Supply Chain Management Logistics',
    qualification: 'Graduation',
    ageLimit: '21-32',
    salary: '₹ 6,00,000/- (Stipend: 15,000 PM for 6 Months)',
    location: 'Pan India',
    trainingFee: '₹ 1,50,000/- (Application Fee: ₹ 90,000/-)',
    selectionProcess:
      '1. Online Application, 2. Online Exam, 3. Online Interview, 4. Get Offer Letter',
    trainingPeriod: '6 Month Working Training',
  },
  {
    id: 43,
    company: 'OM Logistics',
    title: 'Billing Executive/Operations Coordinator',
    qualification: '12th/Graduation',
    ageLimit: '21-30',
    salary: '₹ 2,40,000 - 2,80,000/-',
    location: 'Pan India',
    trainingFee: '₹ 99,000/- (Application Fee: ₹ 31,000/-)',
    selectionProcess:
      '1. Online Application, 2. Online Exam, 3. Online Interview, 4. Get Offer Letter',
    trainingPeriod: '7 Days Online',
  },
  {
    id: 44,
    company: 'Axis Bank',
    title: 'Deputy Managers',
    qualification: 'Graduation Any Stream',
    ageLimit: '21-28',
    salary: '₹ 6,50,000 - 6,80,000/-',
    location: 'Pan India',
    trainingFee: '₹ 3,50,000/- (Application Fee: ₹ 2,25,000/- + Loan 18% GST)',
    selectionProcess:
      '1. Online Application, 2. Online Exam, 3. Online Interview, 4. Get Offer Letter',
    trainingPeriod: '3-4 Months',
  },
  {
    id: 45,
    company: 'Kotak Bank',
    title: 'Relationship Managers',
    qualification: 'Graduation Any Stream',
    ageLimit: '18-25.9',
    salary: '₹ 3,50,000/-',
    location: 'Pan India',
    trainingFee: '₹ 99,000/- (Application Fee: ₹ 50,000/-)',
    selectionProcess:
      '1. Online Application, 2. Online Exam, 3. Online Interview, 4. Get Offer Letter',
    trainingPeriod: '30 Days',
  },
  {
    id: 46,
    company: 'HDFC Bank',
    title: 'Teller/Cashier/Handyman',
    qualification: 'Graduation Any Stream (Female Only)',
    ageLimit: '21-28',
    salary: '₹ 3,00,000/-',
    location: 'Pan India',
    trainingFee: '₹ 1,50,000/- (Application Fee: ₹ 65,000/- + 18% GST)',
    selectionProcess:
      '1. Online Application, 2. Online Exam, 3. Online Interview, 4. Get Offer Letter',
    trainingPeriod: '5 Hours Online',
  },
  {
    id: 47,
    company: 'Air India',
    title: 'Ramp Executive',
    qualification: '12th Pass',
    ageLimit: '18-30',
    salary: '₹ 23,000/- P/M',
    location: 'Maharashtra',
    trainingFee: '₹ 2,50,000/-',
    selectionProcess:
      '1. Online Application, 2. Online Exam, 3. Online Interview, 4. Get Offer Letter',
    trainingPeriod: '1 Month Classroom (Gurugram)',
  },
  {
    id: 48,
    company: 'Air India',
    title: 'Customer Service Associate',
    qualification: 'Graduation Any Stream',
    ageLimit: '21-30',
    salary: '₹ 23,000/- P/M',
    location: 'Maharashtra',
    trainingFee: '₹ 2,75,000/-',
    selectionProcess:
      '1. Online Application, 2. Online Exam, 3. Online Interview, 4. Get Offer Letter',
    trainingPeriod: '1. Delhi, 2. OJT',
  },
  {
    id: 49,
    company: 'Air India',
    title: 'Load Control Agent',
    qualification: 'Graduation Any Stream',
    ageLimit: '21-30',
    salary: '₹ 25,000/- P/M',
    location: 'Maharashtra',
    trainingFee: '₹ 2,85,000/-',
    selectionProcess:
      '1. Online Application, 2. Online Exam, 3. Online Interview, 4. Get Offer Letter',
    trainingPeriod: '1. Delhi, 2. OJT',
  },
  {
    id: 50,
    company: 'Air India',
    title: 'Flight Dispatch Associate',
    qualification: 'Any Degree with Physics & Math',
    ageLimit: '21-30',
    salary: '₹ 28,000/- P/M',
    location: 'Maharashtra',
    trainingFee: '₹ 2,90,000/-',
    selectionProcess:
      '1. Online Application, 2. Online Exam, 3. Online Interview, 4. Get Offer Letter',
    trainingPeriod: '1. Delhi, 2. OJT',
  },
  {
    id: 51,
    company: 'Air India',
    title: 'TSM',
    qualification: 'Graduation Any Stream',
    ageLimit: '21-30',
    salary: '₹ 75,000/- P/M',
    location: 'Maharashtra',
    trainingFee: '₹ 3,50,000/-',
    selectionProcess:
      '1. Online Application, 2. Online Exam, 3. Online Interview, 4. Get Offer Letter',
    trainingPeriod: '2 Month Classroom, 3. OJT',
  },
  {
    id: 52,
    company: 'Himalaya Wellness',
    title: 'TSM',
    qualification: 'Graduation Any Stream',
    ageLimit: '21-35',
    salary: '₹ 3,00,000/- CTC',
    location: 'Pan India',
    trainingFee: '₹ 99,000/- (Application Fee: ₹ 90,000/-)',
    selectionProcess:
      '1. Online Application, 2. Online Exam, 3. Online Interview, 4. Get Offer Letter',
    trainingPeriod: '2 Months',
  },
]

// --- ICONS ---
const SearchIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {' '}
    <circle cx="11" cy="11" r="8"></circle> <line x1="21" y1="21" x2="16.65" y2="16.65"></line>{' '}
  </svg>
)
const ChevronDownIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {' '}
    <polyline points="6 9 12 15 18 9"></polyline>{' '}
  </svg>
)
const FilterIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {' '}
    <polygon points="22 3 2 3 10 12.46V19l4 2v-8.54L22 3z"></polygon>{' '}
  </svg>
)
const XIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {' '}
    <line x1="18" y1="6" x2="6" y2="18"></line> <line x1="6" y1="6" x2="18" y2="18"></line>{' '}
  </svg>
)

// --- JobCard Component (No changes needed here) ---
const JobCard = ({ job }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const getLogoInitial = (company) => company.charAt(0)
  return (
    <JobCardWrapper layout>
      <JobCardStyled>
        <CardHeader onClick={() => setIsExpanded(!isExpanded)}>
          <CompanyLogo>{getLogoInitial(job.company)}</CompanyLogo>
          <HeaderContent>
            <JobTitle>{job.title}</JobTitle>
            <CompanyName>
              {job.company} &bull; {job.location}
            </CompanyName>
          </HeaderContent>
          <ExpandButton animate={{ rotate: isExpanded ? 180 : 0 }}>
            <ChevronDownIcon />
          </ExpandButton>
        </CardHeader>
        <AnimatePresence>
          {isExpanded && (
            <CardBody
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <DetailsGrid>
                <DetailItem>
                  <DetailLabel>Salary</DetailLabel>
                  {job.salary}
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Qualification</DetailLabel>
                  {job.qualification}
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Age Limit</DetailLabel>
                  {job.ageLimit}
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Training Period</DetailLabel>
                  {job.trainingPeriod}
                </DetailItem>
                <DetailItem style={{ gridColumn: '1 / -1' }}>
                  <DetailLabel>Training Fee</DetailLabel>
                  {job.trainingFee}
                </DetailItem>
                <DetailItem style={{ gridColumn: '1 / -1' }}>
                  <DetailLabel>Selection Process</DetailLabel>
                  {job.selectionProcess}
                </DetailItem>
              </DetailsGrid>
              <ApplyButton href="#">Apply Now</ApplyButton>
            </CardBody>
          )}
        </AnimatePresence>
      </JobCardStyled>
    </JobCardWrapper>
  )
}

// --- Main Page Component ---
const TrainingAndPlacements = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedQualifications, setSelectedQualifications] = useState([])
  const [isFilterOpen, setIsFilterOpen] = useState(false) // State for mobile filter dropdown

  const categories = useMemo(
    () => [...new Set(jobData.map((j) => j.company.split(',')[0].split(' ')[0]))],
    []
  )
  const qualifications = useMemo(
    () => [
      ...new Set(
        jobData.map((j) => (j.qualification.includes('12th') ? '12th Pass' : 'Graduation'))
      ),
    ],
    []
  )

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target
    setSelectedCategories((prev) => (checked ? [...prev, value] : prev.filter((c) => c !== value)))
  }

  const removeCategory = (catToRemove) => {
    setSelectedCategories((prev) => prev.filter((c) => c !== catToRemove))
  }

  const handleQualificationChange = (e) => {
    const { value, checked } = e.target
    setSelectedQualifications((prev) =>
      checked ? [...prev, value] : prev.filter((q) => q !== value)
    )
  }

  const removeQualification = (qualToRemove) => {
    setSelectedQualifications((prev) => prev.filter((q) => q !== qualToRemove))
  }

  const resetFilters = () => {
    setSearchTerm('')
    setSelectedCategories([])
    setSelectedQualifications([])
    setIsFilterOpen(false) // Close dropdown on reset
  }

  const activeFilterCount = selectedCategories.length + selectedQualifications.length

  const filteredJobs = useMemo(() => {
    return jobData.filter((job) => {
      const searchTermMatch =
        searchTerm === '' ||
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase())
      const categoryMatch =
        selectedCategories.length === 0 ||
        selectedCategories.some((cat) => job.company.toLowerCase().includes(cat.toLowerCase()))
      const qualificationMatch =
        selectedQualifications.length === 0 ||
        selectedQualifications.some((qual) => {
          if (qual === '12th Pass') return job.qualification.includes('12th')
          if (qual === 'Graduation') return job.qualification.includes('Graduation')
          return false
        })
      return searchTermMatch && categoryMatch && qualificationMatch
    })
  }, [searchTerm, selectedCategories, selectedQualifications])

  return (
    <PageWrapper>
      <Header>
        <MainHeading>Find Your Next Career</MainHeading>
        <SubHeading>
          Explore our curated list of job openings and find your perfect match.
        </SubHeading>
      </Header>

      <MainContent>
        <FilterSidebar>
          <MobileFilterHeader onClick={() => setIsFilterOpen(!isFilterOpen)}>
            <MobileFilterHeaderContent>
              <FilterIcon />
              <span>Filters</span>
              {activeFilterCount > 0 && <ActiveFilterBadge>{activeFilterCount}</ActiveFilterBadge>}
            </MobileFilterHeaderContent>
            <motion.div animate={{ rotate: isFilterOpen ? 180 : 0 }}>
              <ChevronDownIcon />
            </motion.div>
          </MobileFilterHeader>

          <FilterContentWrapper isOpen={isFilterOpen}>
            <FilterGroup>
              <FilterLabel>Search</FilterLabel>
              <InputWrapper>
                <InputIcon>
                  <SearchIcon />
                </InputIcon>
                <StyledInput
                  type="text"
                  placeholder="Job title or company..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputWrapper>
            </FilterGroup>
            <FilterGroup>
              <FilterLabel>Industry</FilterLabel>
              <CheckboxContainer>
                {categories.map((cat) => (
                  <CheckboxLabel key={cat}>
                    {' '}
                    <StyledCheckbox
                      type="checkbox"
                      value={cat}
                      checked={selectedCategories.includes(cat)}
                      onChange={handleCategoryChange}
                    />{' '}
                    {cat}{' '}
                  </CheckboxLabel>
                ))}
              </CheckboxContainer>
            </FilterGroup>
            <FilterGroup>
              <FilterLabel>Qualification</FilterLabel>
              <CheckboxContainer>
                {qualifications.map((qual) => (
                  <CheckboxLabel key={qual}>
                    {' '}
                    <StyledCheckbox
                      type="checkbox"
                      value={qual}
                      checked={selectedQualifications.includes(qual)}
                      onChange={handleQualificationChange}
                    />{' '}
                    {qual}{' '}
                  </CheckboxLabel>
                ))}
              </CheckboxContainer>
            </FilterGroup>
            <ResetButton onClick={resetFilters}>Reset All Filters</ResetButton>
          </FilterContentWrapper>

          {activeFilterCount > 0 && (
            <ActiveFiltersDisplay>
              {selectedCategories.map((cat) => (
                <FilterPill key={cat} onClick={() => removeCategory(cat)}>
                  {cat} <XIcon />
                </FilterPill>
              ))}
              {selectedQualifications.map((qual) => (
                <FilterPill key={qual} onClick={() => removeQualification(qual)}>
                  {qual} <XIcon />
                </FilterPill>
              ))}
            </ActiveFiltersDisplay>
          )}
        </FilterSidebar>

        <JobListingsContainer>
          <ResultsHeader>{filteredJobs.length} Jobs Found</ResultsHeader>
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => <JobCard key={job.id} job={job} />)
          ) : (
            <NoResults>No job openings match your criteria.</NoResults>
          )}
        </JobListingsContainer>
      </MainContent>
    </PageWrapper>
  )
}

export default TrainingAndPlacements

// --- STYLED COMPONENTS (Updated with Mobile Filter Logic) ---
const PageWrapper = styled.div`
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background-color: #f7f8fc;
  min-height: 100vh;
  padding: 2rem;
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
  @media (max-width: 480px) {
    padding: 1rem;
  }
`
const Header = styled.header`
  text-align: center;
  margin-bottom: 2.5rem;
`
const MainHeading = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a202c;
  margin: 0 0 0.5rem 0;
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`
const SubHeading = styled.p`
  font-size: 1.1rem;
  color: #4a5568;
  max-width: 600px;
  margin: 0 auto;
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`
const MainContent = styled.div`
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  align-items: flex-start;
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
`
// --- Filter Sidebar Styles ---
const FilterSidebar = styled.aside`
  background-color: #ffffff;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 2rem;

  @media (max-width: 1024px) {
    position: static;
    top: auto;
    padding: 0; // Padding will be on inner elements
  }
`
const MobileFilterHeader = styled.button`
  display: none; // Hidden on desktop
  width: 100%;
  background-color: #fff;
  border: none;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  color: #2d3748;
  cursor: pointer;
  text-align: left;

  // Flexbox to align icon and text
  display: none;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 1024px) {
    display: flex;
  }
`
const MobileFilterHeaderContent = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`
const ActiveFilterBadge = styled.span`
  background-color: #003380;
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`
const FilterContentWrapper = styled.div`
  // On desktop, it's just a pass-through

  @media (max-width: 1024px) {
    // On mobile, it's the collapsible area
    max-height: ${(props) => (props.isOpen ? '1000px' : '0')};
    overflow: hidden;
    opacity: ${(props) => (props.isOpen ? '1' : '0')};
    transition: all 0.4s ease-in-out;
    padding: ${(props) => (props.isOpen ? '1.5rem' : '0 1.5rem')};
    background-color: #fff;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
    margin-top: ${(props) => (props.isOpen ? '-1px' : '0')}; // Overlap border
    border-top: ${(props) => (props.isOpen ? '1px solid #e2e8f0' : 'none')};
  }
`
const ActiveFiltersDisplay = styled.div`
  display: none; // Hidden on desktop
  padding: 1rem 1.5rem 0.5rem;
  background-color: #fff;
  border-top: 1px solid #e2e8f0;
  margin-top: -12px; // Pull up under header
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  /* z-index: -1; */
  position: relative;

  @media (max-width: 1024px) {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  /* border: 2px solid red; */
`
const FilterPill = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #eef2ff;
  color: #4338ca;
  border: 1px solid #c7d2fe;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #e0e7ff;
    border-color: #a5b4fc;
  }

  svg {
    color: #6366f1;
  }
`
const FilterGroup = styled.div`
  margin-bottom: 2rem;
  &:last-of-type {
    margin-bottom: 1.5rem;
  }
`
const FilterLabel = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #2d3748;
  margin: 0 0 1rem 0;
`
const InputWrapper = styled.div`
  position: relative;
`
const StyledInput = styled.input`
  width: 100%;
  padding: 0.7rem 1rem 0.7rem 2.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.95rem;
  color: #2d3748;
  transition: all 0.2s ease;
  &:focus {
    outline: none;
    border-color: #003380;
    box-shadow: 0 0 0 2px rgba(0, 51, 128, 0.2);
  }
`
const InputIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 0.8rem;
  transform: translateY(-50%);
  color: #a0aec0;
`
const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem 1rem;
  }
`
const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 0.95rem;
  color: #4a5568;
`
const StyledCheckbox = styled.input`
  margin-right: 0.75rem;
  height: 18px;
  width: 18px;
  accent-color: #003380;
`
const ResetButton = styled.button`
  width: 100%;
  padding: 0.7rem;
  background-color: #e2e8f0;
  color: #4a5568;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    background-color: #cbd5e0;
  }
`
// --- Job Listings Styles (No changes needed here) ---
const JobListingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`
const ResultsHeader = styled.div`
  background-color: #fff;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #2d3748;
`
const JobCardWrapper = styled(motion.div)``
const JobCardStyled = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
  overflow: hidden;
  transition: box-shadow 0.3s ease;
  &:hover {
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  }
`
const CardHeader = styled.div`
  padding: 1.5rem;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  @media (max-width: 480px) {
    padding: 1rem;
    gap: 0.75rem;
  }
`
const CompanyLogo = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 8px;
  background-color: #f7f8fc;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1.2rem;
  color: #003380;
  border: 1px solid #e2e8f0;
  @media (max-width: 480px) {
    width: 44px;
    height: 44px;
    font-size: 1.1rem;
  }
`
const HeaderContent = styled.div``
const JobTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 600;
  color: #1a202c;
  margin: 0 0 0.25rem 0;
  @media (max-width: 480px) {
    font-size: 1.05rem;
  }
`
const CompanyName = styled.p`
  font-size: 0.95rem;
  color: #4a5568;
  margin: 0;
  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`
const ExpandButton = styled(motion.div)`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #f7f8fc;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4a5568;
`
const CardBody = styled(motion.div)`
  padding: 0 1.5rem 1.5rem 1.5rem;
  border-top: 1px solid #e2e8f0;
  color: #2d3748;
  @media (max-width: 480px) {
    padding: 0 1rem 1rem 1rem;
  }
`
const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.25rem;
  padding-top: 1.5rem;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`
const DetailItem = styled.div`
  font-size: 0.95rem;
  line-height: 1.5;
`
const DetailLabel = styled.strong`
  display: block;
  color: #003380;
  font-weight: 600;
  margin-bottom: 0.25rem;
`
const ApplyButton = styled.a`
  display: inline-block;
  margin-top: 1.5rem;
  padding: 0.7rem 1.5rem;
  background-color: #003380;
  color: white;
  text-decoration: none;
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.3s ease;
  &:hover {
    background-color: #001f5a;
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 51, 128, 0.2);
  }
`
const NoResults = styled.div`
  text-align: center;
  padding: 3rem;
  color: #718096;
  background-color: #fff;
  border-radius: 12px;
`
