import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAppStore = create(
  persist(
    (set) => ({
      // Document & Flight Data
      flightData: null,
      setFlightData: (data) => set({ flightData: data }),
      
      // Price Verification
      originalPrice: null,
      currentPrice: null,
      priceVerified: false,
      setCurrentPrice: (price) => set({ currentPrice: price }),
      setPriceVerified: (verified) => set({ priceVerified: verified }),
      
      // Price Monitoring
      monitoringActive: false,
      priceDropDetected: false,
      monitoringHistory: [],
      setMonitoringActive: (active) => set({ monitoringActive: active }),
      setPriceDropDetected: (detected) => set({ priceDropDetected: detected }),
      addMonitoringCheck: (check) => set((state) => ({
        monitoringHistory: [...state.monitoringHistory, check],
      })),
      
      // Policy Analysis
      airlinePolicy: null,
      eligibilityStatus: null,
      legalBasis: null,
      setAirlinePolicy: (policy) => set({ airlinePolicy: policy }),
      setEligibilityStatus: (status) => set({ eligibilityStatus: status }),
      setLegalBasis: (basis) => set({ legalBasis: basis }),
      
      // Email Sending
      senderEmail: '',
      senderName: '',
      setSenderEmail: (email) => set({ senderEmail: email }),
      setSenderName: (name) => set({ senderName: name }),
      
      // Submission Status
      emailSent: false,
      submissionTimestamp: null,
      airlineResponse: null,
      setEmailSent: (sent, timestamp) => set({ emailSent: sent, submissionTimestamp: timestamp }),
      setAirlineResponse: (response) => set({ airlineResponse: response }),
      
      // UI State
      currentStep: 1,
      setCurrentStep: (step) => set({ currentStep: step }),
      loading: false,
      setLoading: (loading) => set({ loading }),
      error: null,
      setError: (error) => set({ error }),
      
      // Reset
      reset: () => set({
        flightData: null,
        originalPrice: null,
        currentPrice: null,
        priceVerified: false,
        monitoringActive: false,
        priceDropDetected: false,
        monitoringHistory: [],
        airlinePolicy: null,
        eligibilityStatus: null,
        legalBasis: null,
        senderEmail: '',
        senderName: '',
        emailSent: false,
        submissionTimestamp: null,
        airlineResponse: null,
        currentStep: 1,
        loading: false,
        error: null,
      }),
    }),
    {
      name: 'fairclaim-store',
      partialize: (state) => ({
        flightData: state.flightData,
        originalPrice: state.originalPrice,
        currentPrice: state.currentPrice,
        priceVerified: state.priceVerified,
        monitoringActive: state.monitoringActive,
        priceDropDetected: state.priceDropDetected,
        airlinePolicy: state.airlinePolicy,
        eligibilityStatus: state.eligibilityStatus,
        legalBasis: state.legalBasis,
        emailSent: state.emailSent,
        submissionTimestamp: state.submissionTimestamp,
      }),
    }
  )
);
