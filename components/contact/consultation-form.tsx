'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ANALYTICS_EVENTS } from '@/config/constants';
import { firebaseEnhancedFormsService } from '@/lib/firebase-enhanced-forms';
import { ArrowLeft, ArrowRight, Calendar, CheckCircle } from 'lucide-react';
import { useState } from 'react';

interface FormData {
  // Step 1: Contact Information
  fullName: string;
  email: string;
  companyName: string;
  jobTitle: string;
  phone: string;

  // Step 2: Company Context
  companySize: string;
  industry: string;
  businessChallenge: string;
  aiStatus: string;
  successVision: string;

  // Step 3: Consultation Focus
  serviceInterests: string[];
  timeline: string;
  budgetRange: string;
  techComfort: string;
  objectives: string;

  // Step 4: Scheduling
  consultationFormat: string;
  availability: string;
  stakeholders: string;
  preparationMaterials: string;
}

const initialFormData: FormData = {
  fullName: '',
  email: '',
  companyName: '',
  jobTitle: '',
  phone: '',
  companySize: '',
  industry: '',
  businessChallenge: '',
  aiStatus: '',
  successVision: '',
  serviceInterests: [],
  timeline: '',
  budgetRange: '',
  techComfort: '',
  objectives: '',
  consultationFormat: '',
  availability: '',
  stakeholders: '',
  preparationMaterials: '',
};

export function ConsultationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const totalSteps = 4;

  const updateFormData = (field: keyof FormData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleServiceInterestChange = (service: string, checked: boolean) => {
    const currentInterests = formData.serviceInterests;
    if (checked) {
      updateFormData('serviceInterests', [...currentInterests, service]);
    } else {
      updateFormData(
        'serviceInterests',
        currentInterests.filter(s => s !== service)
      );
    }
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.fullName && formData.email && formData.companyName && formData.jobTitle);
      case 2:
        return !!(
          formData.companySize &&
          formData.industry &&
          formData.businessChallenge &&
          formData.aiStatus &&
          formData.successVision
        );
      case 3:
        return !!(
          formData.serviceInterests.length > 0 &&
          formData.timeline &&
          formData.budgetRange &&
          formData.techComfort &&
          formData.objectives
        );
      case 4:
        return !!(formData.consultationFormat && formData.availability);
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep) && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);
    try {
      // Track analytics event
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', ANALYTICS_EVENTS.consultationRequest, {
          company_size: formData.companySize,
          industry: formData.industry,
          budget_range: formData.budgetRange,
          timeline: formData.timeline,
        });
      }

      // Submit consultation booking to Firebase
      await firebaseEnhancedFormsService.submitConsultationBooking({
        fullName: formData.fullName,
        email: formData.email,
        companyName: formData.companyName,
        jobTitle: formData.jobTitle,
        phone: formData.phone,
        companySize: formData.companySize,
        industry: formData.industry,
        businessChallenge: formData.businessChallenge,
        aiStatus: formData.aiStatus,
        successVision: formData.successVision,
        serviceInterests: formData.serviceInterests,
        timeline: formData.timeline,
        budgetRange: formData.budgetRange,
        techComfort: formData.techComfort,
        objectives: formData.objectives,
        consultationFormat: formData.consultationFormat,
        availability: formData.availability,
        stakeholders: formData.stakeholders,
        preparationMaterials: formData.preparationMaterials,
      });

      setIsSubmitted(true);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section id='consultation-form' className='py-24 bg-bg-fieldporter-secondary'>
        <div className='container mx-auto px-4'>
          <div className='max-w-2xl mx-auto text-center'>
            <Card className='bg-white/5 border-white/10 backdrop-blur-sm'>
              <CardContent className='p-12'>
                <CheckCircle className='h-16 w-16 text-green-500 mx-auto mb-6' />
                <h2 className='text-3xl font-bold text-fieldporter-white mb-4'>
                  Consultation Request Received
                </h2>
                <p className='text-fieldporter-gray mb-6'>
                  Thank you for your interest in FIELDPORTER&apos;s strategic AI consulting. Our
                  team will review your submission and contact you within 24 hours to schedule your
                  consultation.
                </p>
                <p className='text-fieldporter-blue font-semibold'>
                  Check your email for confirmation and next steps.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id='consultation-form' className='py-24 bg-bg-fieldporter-secondary'>
      <div className='container mx-auto px-4'>
        <div className='max-w-4xl mx-auto'>
          {/* Form Header */}
          <div className='text-center mb-12'>
            <h2 className='text-4xl font-bold text-fieldporter-white mb-4'>
              Strategic Consultation Booking
            </h2>
            <p className='text-fieldporter-gray text-lg'>
              Complete this form to schedule your personalized AI transformation consultation
            </p>
          </div>

          {/* Progress Indicator */}
          <div className='mb-12'>
            <div className='flex items-center justify-between max-w-2xl mx-auto px-4'>
              {Array.from({ length: totalSteps }, (_, i) => i + 1).map(step => (
                <div key={step} className='flex items-center'>
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-semibold text-sm sm:text-base ${
                      step <= currentStep
                        ? 'bg-fieldporter-blue text-fieldporter-white'
                        : 'bg-fieldporter-gray/20 text-fieldporter-gray'
                    }`}
                  >
                    {step}
                  </div>
                  {step < totalSteps && (
                    <div
                      className={`w-8 sm:w-16 h-1 mx-1 sm:mx-2 ${
                        step < currentStep ? 'bg-fieldporter-blue' : 'bg-fieldporter-gray/20'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <Card className='bg-white/5 border-white/10 backdrop-blur-sm'>
            <CardHeader>
              <CardTitle className='text-fieldporter-white'>
                {currentStep === 1 && 'Contact Information'}
                {currentStep === 2 && 'Company Context'}
                {currentStep === 3 && 'Consultation Focus'}
                {currentStep === 4 && 'Scheduling Preferences'}
              </CardTitle>
              <CardDescription className='text-fieldporter-gray'>
                {currentStep === 1 && 'Let us know how to reach you and your role'}
                {currentStep === 2 && 'Help us understand your company and current challenges'}
                {currentStep === 3 && 'Define your consultation objectives and requirements'}
                {currentStep === 4 && 'Choose your preferred consultation format and timing'}
              </CardDescription>
            </CardHeader>
            <CardContent className='p-4 sm:p-8'>
              {/* Step 1: Contact Information */}
              {currentStep === 1 && (
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div>
                    <Label htmlFor='fullName' className='text-fieldporter-white'>
                      Full Name *
                    </Label>
                    <Input
                      id='fullName'
                      value={formData.fullName}
                      onChange={e => updateFormData('fullName', e.target.value)}
                      placeholder='John Smith'
                      className='mt-2'
                    />
                  </div>
                  <div>
                    <Label htmlFor='email' className='text-fieldporter-white'>
                      Email Address *
                    </Label>
                    <Input
                      id='email'
                      type='email'
                      value={formData.email}
                      onChange={e => updateFormData('email', e.target.value)}
                      placeholder='john.smith@company.com'
                      className='mt-2'
                    />
                  </div>
                  <div>
                    <Label htmlFor='companyName' className='text-fieldporter-white'>
                      Company Name *
                    </Label>
                    <Input
                      id='companyName'
                      value={formData.companyName}
                      onChange={e => updateFormData('companyName', e.target.value)}
                      placeholder='Acme Corporation'
                      className='mt-2'
                    />
                  </div>
                  <div>
                    <Label htmlFor='jobTitle' className='text-fieldporter-white'>
                      Job Title/Role *
                    </Label>
                    <Input
                      id='jobTitle'
                      value={formData.jobTitle}
                      onChange={e => updateFormData('jobTitle', e.target.value)}
                      placeholder='Chief Technology Officer'
                      className='mt-2'
                    />
                  </div>
                  <div className='md:col-span-2'>
                    <Label htmlFor='phone' className='text-fieldporter-white'>
                      Phone Number (Optional)
                    </Label>
                    <Input
                      id='phone'
                      type='tel'
                      value={formData.phone}
                      onChange={e => updateFormData('phone', e.target.value)}
                      placeholder='+1 (555) 123-4567'
                      className='mt-2'
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Company Context */}
              {currentStep === 2 && (
                <div className='space-y-6'>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div>
                      <Label className='text-fieldporter-white'>Company Size *</Label>
                      <Select
                        value={formData.companySize}
                        onValueChange={value => updateFormData('companySize', value)}
                      >
                        <SelectTrigger className='mt-2'>
                          <SelectValue placeholder='Select company size' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='<100'>Less than 100 employees</SelectItem>
                          <SelectItem value='100-1000'>100-1,000 employees</SelectItem>
                          <SelectItem value='1000-10000'>1,000-10,000 employees</SelectItem>
                          <SelectItem value='10000+'>10,000+ employees</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className='text-fieldporter-white'>Industry Sector *</Label>
                      <Select
                        value={formData.industry}
                        onValueChange={value => updateFormData('industry', value)}
                      >
                        <SelectTrigger className='mt-2'>
                          <SelectValue placeholder='Select industry' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='financial-services'>Financial Services</SelectItem>
                          <SelectItem value='healthcare'>Healthcare</SelectItem>
                          <SelectItem value='manufacturing'>Manufacturing</SelectItem>
                          <SelectItem value='technology'>Technology</SelectItem>
                          <SelectItem value='retail'>Retail & E-commerce</SelectItem>
                          <SelectItem value='energy'>Energy & Utilities</SelectItem>
                          <SelectItem value='other'>Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor='businessChallenge' className='text-fieldporter-white'>
                      Primary Business Challenge *
                    </Label>
                    <Textarea
                      id='businessChallenge'
                      value={formData.businessChallenge}
                      onChange={e => updateFormData('businessChallenge', e.target.value)}
                      placeholder="Describe the main business challenge you're looking to address with AI..."
                      className='mt-2'
                      rows={4}
                    />
                  </div>
                  <div>
                    <Label className='text-fieldporter-white'>Current AI/Automation Status *</Label>
                    <Select
                      value={formData.aiStatus}
                      onValueChange={value => updateFormData('aiStatus', value)}
                    >
                      <SelectTrigger className='mt-2'>
                        <SelectValue placeholder='Select current status' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='none'>No AI implementation</SelectItem>
                        <SelectItem value='piloting'>Piloting AI solutions</SelectItem>
                        <SelectItem value='implementing'>Currently implementing</SelectItem>
                        <SelectItem value='scaling'>Scaling existing AI</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor='successVision' className='text-fieldporter-white'>
                      What would successful automation look like for your business? *
                    </Label>
                    <Textarea
                      id='successVision'
                      value={formData.successVision}
                      onChange={e => updateFormData('successVision', e.target.value)}
                      placeholder='Describe your ideal outcome - what processes would be automated, what efficiency gains you expect...'
                      className='mt-2'
                      rows={3}
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Consultation Focus */}
              {currentStep === 3 && (
                <div className='space-y-6'>
                  <div>
                    <Label className='text-fieldporter-white mb-4 block'>Service Interests *</Label>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                      {[
                        'AI Strategy Development',
                        'Business Process Automation',
                        'VC Portfolio Optimization',
                        'AI Implementation',
                        'Digital Transformation',
                        'Performance Analytics',
                      ].map(service => (
                        <div key={service} className='flex items-center space-x-2'>
                          <Checkbox
                            id={service}
                            checked={formData.serviceInterests.includes(service)}
                            onCheckedChange={checked =>
                              handleServiceInterestChange(service, checked as boolean)
                            }
                          />
                          <Label htmlFor={service} className='text-fieldporter-white text-sm'>
                            {service}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div>
                      <Label className='text-fieldporter-white'>Implementation Timeline *</Label>
                      <Select
                        value={formData.timeline}
                        onValueChange={value => updateFormData('timeline', value)}
                      >
                        <SelectTrigger className='mt-2'>
                          <SelectValue placeholder='Select timeline' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='immediate'>Immediate (0-3 months)</SelectItem>
                          <SelectItem value='short'>Short-term (3-6 months)</SelectItem>
                          <SelectItem value='medium'>Medium-term (6-12 months)</SelectItem>
                          <SelectItem value='long'>Long-term (12+ months)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className='text-fieldporter-white'>Budget Range *</Label>
                      <Select
                        value={formData.budgetRange}
                        onValueChange={value => updateFormData('budgetRange', value)}
                      >
                        <SelectTrigger className='mt-2'>
                          <SelectValue placeholder='Select budget range' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='100k-500k'>$100K - $500K</SelectItem>
                          <SelectItem value='500k-1m'>$500K - $1M</SelectItem>
                          <SelectItem value='1m-5m'>$1M - $5M</SelectItem>
                          <SelectItem value='5m+'>$5M+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label className='text-fieldporter-white'>
                      Team&apos;s Technical Comfort Level *
                    </Label>
                    <Select
                      value={formData.techComfort}
                      onValueChange={value => updateFormData('techComfort', value)}
                    >
                      <SelectTrigger className='mt-2'>
                        <SelectValue placeholder='Rate your team technical readiness' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='beginner'>
                          Beginner - Need significant guidance
                        </SelectItem>
                        <SelectItem value='intermediate'>
                          Intermediate - Some technical experience
                        </SelectItem>
                        <SelectItem value='advanced'>
                          Advanced - Strong technical capabilities
                        </SelectItem>
                        <SelectItem value='expert'>Expert - Leading-edge technical team</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor='objectives' className='text-fieldporter-white'>
                      Specific Consultation Objectives *
                    </Label>
                    <Textarea
                      id='objectives'
                      value={formData.objectives}
                      onChange={e => updateFormData('objectives', e.target.value)}
                      placeholder='What specific outcomes do you want from this consultation?'
                      className='mt-2'
                      rows={4}
                    />
                  </div>
                </div>
              )}

              {/* Step 4: Scheduling */}
              {currentStep === 4 && (
                <div className='space-y-6'>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div>
                      <Label className='text-fieldporter-white'>Consultation Format *</Label>
                      <Select
                        value={formData.consultationFormat}
                        onValueChange={value => updateFormData('consultationFormat', value)}
                      >
                        <SelectTrigger className='mt-2'>
                          <SelectValue placeholder='Select format' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='video'>Video Call</SelectItem>
                          <SelectItem value='in-person'>In-Person Meeting</SelectItem>
                          <SelectItem value='phone'>Phone Call</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor='availability' className='text-fieldporter-white'>
                        Availability Preferences *
                      </Label>
                      <Input
                        id='availability'
                        value={formData.availability}
                        onChange={e => updateFormData('availability', e.target.value)}
                        placeholder='e.g., Weekdays 9-5 EST, flexible'
                        className='mt-2'
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor='stakeholders' className='text-fieldporter-white'>
                      Additional Stakeholders
                    </Label>
                    <Input
                      id='stakeholders'
                      value={formData.stakeholders}
                      onChange={e => updateFormData('stakeholders', e.target.value)}
                      placeholder='Who else should be included in the consultation?'
                      className='mt-2'
                    />
                  </div>
                  <div>
                    <Label htmlFor='preparationMaterials' className='text-fieldporter-white'>
                      Preparation Materials
                    </Label>
                    <Textarea
                      id='preparationMaterials'
                      value={formData.preparationMaterials}
                      onChange={e => updateFormData('preparationMaterials', e.target.value)}
                      placeholder='Any documents or information we should review beforehand?'
                      className='mt-2'
                      rows={3}
                    />
                  </div>
                </div>
              )}

              {/* Form Navigation */}
              <div className='flex justify-between items-center mt-8 pt-6 border-t border-white/10'>
                <Button
                  variant='outline'
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className='border-fieldporter-gray/30 text-fieldporter-white hover:bg-white/5'
                >
                  <ArrowLeft className='mr-2 h-4 w-4' />
                  Previous
                </Button>

                {currentStep < totalSteps ? (
                  <Button
                    onClick={nextStep}
                    disabled={!validateStep(currentStep)}
                    className='bg-fieldporter-blue hover:bg-fieldporter-blue/90 text-fieldporter-white'
                  >
                    Next Step
                    <ArrowRight className='ml-2 h-4 w-4' />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={!validateStep(currentStep) || isSubmitting}
                    className='bg-fieldporter-blue hover:bg-fieldporter-blue/90 text-fieldporter-white'
                  >
                    {isSubmitting ? (
                      'Submitting...'
                    ) : (
                      <>
                        <Calendar className='mr-2 h-4 w-4' />
                        Schedule Consultation
                      </>
                    )}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
