'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { EnterpriseInput } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ContactFormData, firebaseFormsService } from '@/lib/firebase-forms';
import { ArrowRight, CheckCircle, Copy, Mail } from 'lucide-react';
import { useState } from 'react';

export function SimpleContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    company: '',
    projectType: '',
    challengeDescription: '',
    timeline: '',
    budgetRange: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [characterCount, setCharacterCount] = useState(0);
  const [emailCopied, setEmailCopied] = useState(false);

  // Enhanced validation states for premium animations
  const [fieldValidation, setFieldValidation] = useState<{
    [key: string]: 'initial' | 'success' | 'error';
  }>({
    name: 'initial',
    email: 'initial',
    company: 'initial',
    challengeDescription: 'initial',
  });

  // Form validation
  const isFormValid =
    formData.name.trim().length > 0 &&
    formData.email.trim().length > 0 &&
    formData.email.includes('@') &&
    formData.challengeDescription.trim().length >= 20;

  const updateFormData = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    // Update validation states for premium animations
    if (field === 'name') {
      setFieldValidation(prev => ({
        ...prev,
        name: value.trim().length > 0 ? 'success' : 'initial',
      }));
    } else if (field === 'email') {
      setFieldValidation(prev => ({
        ...prev,
        email: value.includes('@') && value.trim().length > 0 ? 'success' : 'initial',
      }));
    } else if (field === 'company') {
      setFieldValidation(prev => ({
        ...prev,
        company: value.trim().length > 0 ? 'success' : 'initial',
      }));
    } else if (field === 'challengeDescription') {
      setCharacterCount(value.length);
      setFieldValidation(prev => ({
        ...prev,
        challengeDescription: value.trim().length >= 20 ? 'success' : 'initial',
      }));
    }

    if (errors.length > 0) {
      setErrors([]);
    }
  };

  const copyEmailToClipboard = async () => {
    try {
      await navigator.clipboard.writeText('freddy@fieldporter.com');
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch (error) {
      const textArea = document.createElement('textarea');
      textArea.value = 'freddy@fieldporter.com';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = firebaseFormsService.validateFormData(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      // Set error states for premium validation animations
      setFieldValidation(prev => ({
        ...prev,
        name: formData.name.trim().length === 0 ? 'error' : prev['name'] || 'initial',
        email:
          !formData.email.includes('@') || formData.email.trim().length === 0
            ? 'error'
            : prev['email'] || 'initial',
        challengeDescription:
          formData.challengeDescription.trim().length < 20
            ? 'error'
            : prev['challengeDescription'] || 'initial',
      }));
      return;
    }

    setIsSubmitting(true);
    setErrors([]);

    try {
      const result = await firebaseFormsService.submitContactForm(formData);

      if (result.success) {
        setIsSubmitted(true);
      } else {
        setErrors([result.error || 'An unexpected error occurred. Please try again.']);
      }
    } catch (error) {
      setErrors(['Network error. Please check your connection and try again.']);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section id='contact-form' className='py-16 lg:py-24 bg-bg-fieldporter-secondary'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='max-w-2xl mx-auto text-center'>
            <Card className='bg-white/5 border-white/10 backdrop-blur-md' enableAnimations={true}>
              <CardContent className='p-8 md:p-12'>
                <CheckCircle className='h-16 w-16 text-green-500 mx-auto mb-6' />
                <h2 className='text-2xl md:text-3xl font-bold text-fieldporter-white mb-4'>
                  Message Received
                </h2>
                <p className='text-lg text-fieldporter-gray mb-6 leading-relaxed'>
                  Thanks for reaching out! We&apos;ve received your message and will respond within
                  24 hours with an honest assessment of how we can help. If we&apos;re a good fit,
                  we&apos;ll suggest a brief video call to discuss your challenge in detail.
                </p>
                <div className='bg-white/5 border-white/10 rounded-lg p-4 mb-6'>
                  <p className='text-fieldporter-blue font-semibold text-sm mb-2'>
                    What happens next:
                  </p>
                  <ul className='text-fieldporter-gray text-sm space-y-1 text-left'>
                    <li>• Personal response from us within 24 hours</li>
                    <li>• Honest assessment of project fit and approach</li>
                    <li>• Brief video call if there&apos;s alignment</li>
                    <li>• Clear project scope and timeline if we proceed</li>
                  </ul>
                </div>
                <p className='text-fieldporter-gray text-sm'>
                  Check your email for confirmation. Urgent? Email{' '}
                  <span className='text-fieldporter-blue font-medium'>freddy@fieldporter.com</span>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id='contact-form' className='py-16 lg:py-24 bg-bg-fieldporter-secondary'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl md:text-4xl font-bold text-fieldporter-white mb-4'>
            Tell Me About Your Challenge
          </h2>
          <p className='text-lg text-fieldporter-gray max-w-2xl mx-auto leading-relaxed'>
            The more specific you can be, the better we can assess how to help.
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-12'>
          <div className='lg:col-span-2'>
            <Card className='bg-white/5 border-white/10 backdrop-blur-md' enableAnimations={true}>
              <CardHeader className='p-6 md:p-8'>
                <CardTitle className='text-xl md:text-2xl text-fieldporter-white'>
                  Contact Information
                </CardTitle>
                <CardDescription className='text-fieldporter-gray'>
                  Let&apos;s start with the basics so we can respond personally
                </CardDescription>
              </CardHeader>
              <CardContent className='p-6 md:p-8 pt-0'>
                <form onSubmit={handleSubmit} className='space-y-6'>
                  {errors.length > 0 && (
                    <div className='bg-red-500/10 border border-red-500/20 rounded-lg p-4'>
                      <ul className='text-red-400 text-sm space-y-1'>
                        {errors.map((error, index) => (
                          <li key={index}>• {error}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                    <div className='space-y-2'>
                      <Label htmlFor='name' className='text-fieldporter-white font-medium'>
                        Name <span className='text-red-400'>*</span>
                      </Label>
                      <EnterpriseInput
                        id='name'
                        type='text'
                        value={formData.name}
                        onChange={e => updateFormData('name', e.target.value)}
                        placeholder='Your full name'
                        enableAnimations={true}
                        validationState={fieldValidation['name'] || 'initial'}
                        required
                      />
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='email' className='text-fieldporter-white font-medium'>
                        Email <span className='text-red-400'>*</span>
                      </Label>
                      <EnterpriseInput
                        id='email'
                        type='email'
                        value={formData.email}
                        onChange={e => updateFormData('email', e.target.value)}
                        placeholder='your.email@company.com'
                        enableAnimations={true}
                        validationState={fieldValidation['email'] || 'initial'}
                        required
                      />
                    </div>
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='company' className='text-fieldporter-white font-medium'>
                      Company <span className='text-fieldporter-gray text-sm'>(optional)</span>
                    </Label>
                    <EnterpriseInput
                      id='company'
                      type='text'
                      value={formData.company}
                      onChange={e => updateFormData('company', e.target.value)}
                      placeholder='Your company name'
                      enableAnimations={true}
                      validationState={fieldValidation['company'] || 'initial'}
                    />
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='projectType' className='text-fieldporter-white font-medium'>
                      Project Type <span className='text-red-400'>*</span>
                    </Label>
                    <Select
                      value={formData.projectType || ''}
                      onValueChange={value => updateFormData('projectType', value)}
                    >
                      <SelectTrigger className='bg-white/5 border-white/10 text-fieldporter-white focus:border-fieldporter-blue min-h-[48px] text-base'>
                        <SelectValue placeholder='Select project type' />
                      </SelectTrigger>
                      <SelectContent className='bg-fieldporter-black border-white/10'>
                        <SelectItem value='Strategic Research Intelligence'>
                          Strategic Research Intelligence
                        </SelectItem>
                        <SelectItem value='Rapid Development & Integration'>
                          Rapid Development & Integration
                        </SelectItem>
                        <SelectItem value='Process Efficiency & Workflow Optimization'>
                          Process Efficiency & Workflow Optimization
                        </SelectItem>
                        <SelectItem value='AI Training & Implementation Education'>
                          AI Training & Implementation Education
                        </SelectItem>
                        <SelectItem value="Not Sure - Let's Discuss">
                          Not Sure - Let&apos;s Discuss
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='challenge' className='text-fieldporter-white font-medium'>
                      Describe Your Challenge <span className='text-red-400'>*</span>
                    </Label>
                    <Textarea
                      id='challenge'
                      value={formData.challengeDescription}
                      onChange={e => updateFormData('challengeDescription', e.target.value)}
                      placeholder="What are you trying to build, understand, or improve? Include any specific outcomes you're hoping to achieve."
                      rows={4}
                      className='bg-white/5 border-white/10 text-fieldporter-white placeholder:text-fieldporter-gray focus:border-fieldporter-blue resize-none text-base'
                      required
                    />
                    <div className='flex justify-between text-sm'>
                      <span className='text-fieldporter-gray'>
                        {characterCount < 20
                          ? 'Please provide more detail (minimum 20 characters)'
                          : 'Good level of detail'}
                      </span>
                      <span
                        className={`${characterCount < 20 ? 'text-red-400' : 'text-fieldporter-gray'}`}
                      >
                        {characterCount} characters
                      </span>
                    </div>
                  </div>

                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                    <div className='space-y-2'>
                      <Label htmlFor='timeline' className='text-fieldporter-white font-medium'>
                        Timeline <span className='text-red-400'>*</span>
                      </Label>
                      <Select
                        value={formData.timeline || ''}
                        onValueChange={value => updateFormData('timeline', value)}
                      >
                        <SelectTrigger className='bg-white/5 border-white/10 text-fieldporter-white focus:border-fieldporter-blue min-h-[48px] text-base'>
                          <SelectValue placeholder='Select timeline' />
                        </SelectTrigger>
                        <SelectContent className='bg-fieldporter-black border-white/10'>
                          <SelectItem value='Urgent (days)'>Urgent (within days)</SelectItem>
                          <SelectItem value='Short-term (weeks)'>Short-term (weeks)</SelectItem>
                          <SelectItem value='Medium-term (months)'>Medium-term (months)</SelectItem>
                          <SelectItem value='Flexible'>Flexible</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className='space-y-2'>
                      <Label htmlFor='budget' className='text-fieldporter-white font-medium'>
                        Budget Range{' '}
                        <span className='text-fieldporter-gray text-sm'>(optional)</span>
                      </Label>
                      <Select
                        value={formData.budgetRange || ''}
                        onValueChange={value => updateFormData('budgetRange', value)}
                      >
                        <SelectTrigger className='bg-white/5 border-white/10 text-fieldporter-white focus:border-fieldporter-blue min-h-[48px] text-base'>
                          <SelectValue placeholder='Select budget range' />
                        </SelectTrigger>
                        <SelectContent className='bg-fieldporter-black border-white/10'>
                          <SelectItem value='Under $3K'>Under $3K</SelectItem>
                          <SelectItem value='$3K-$8K'>$3K-$8K</SelectItem>
                          <SelectItem value='Above $8K'>Above $8K</SelectItem>
                          <SelectItem value="Let's discuss">Let&apos;s discuss</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button
                    type='submit'
                    variant='fieldporter-blue'
                    size='enterprise'
                    disabled={!isFormValid || isSubmitting}
                    enableAnimations={true}
                    isLoading={isSubmitting}
                    className='w-full'
                  >
                    {isSubmitting ? (
                      'Sending Message...'
                    ) : (
                      <>
                        <span>Send Message</span>
                        <ArrowRight className='w-5 h-5 ml-2' />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Options Sidebar */}
          <div className='space-y-6'>
            <Card className='bg-white/5 border-white/10 backdrop-blur-md' enableAnimations={true}>
              <CardHeader className='p-6'>
                <CardTitle className='text-lg text-fieldporter-white'>Quick Contact</CardTitle>
              </CardHeader>
              <CardContent className='p-6 pt-0 space-y-4'>
                <div className='flex items-center space-x-3'>
                  <Mail className='h-5 w-5 text-fieldporter-blue flex-shrink-0' />
                  <div className='flex-1'>
                    <p className='text-fieldporter-white text-sm font-medium'>Direct Email</p>
                    <button
                      onClick={copyEmailToClipboard}
                      className='text-fieldporter-blue hover:text-fieldporter-blue/80 text-sm flex items-center group transition-colors'
                    >
                      freddy@fieldporter.com
                      <Copy className='h-3 w-3 ml-1 group-hover:scale-110 transition-transform' />
                      {emailCopied && <span className='text-green-400 text-xs ml-2'>Copied!</span>}
                    </button>
                  </div>
                </div>
                <div className='text-xs text-fieldporter-gray pt-2 border-t border-white/10'>
                  Response within 24 hours
                </div>
              </CardContent>
            </Card>

            <Card className='bg-white/5 border-white/10 backdrop-blur-md' enableAnimations={true}>
              <CardContent className='p-6'>
                <h3 className='text-fieldporter-white font-semibold mb-3'>What to Expect</h3>
                <ul className='space-y-2 text-sm text-fieldporter-gray'>
                  <li className='flex items-start space-x-2'>
                    <div className='w-1.5 h-1.5 rounded-full bg-fieldporter-blue mt-2 flex-shrink-0' />
                    <span>Personal response from Frederick</span>
                  </li>
                  <li className='flex items-start space-x-2'>
                    <div className='w-1.5 h-1.5 rounded-full bg-fieldporter-blue mt-2 flex-shrink-0' />
                    <span>Honest assessment of fit</span>
                  </li>
                  <li className='flex items-start space-x-2'>
                    <div className='w-1.5 h-1.5 rounded-full bg-fieldporter-blue mt-2 flex-shrink-0' />
                    <span>Clear next steps if aligned</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
