import { useState, useRef } from 'react';
import { LiaTelegramPlane, LiaRedoAltSolid } from 'react-icons/lia';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { translations, contactGenderOptions, contactQuestionOptions } from '@/utils/i18n';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Spinner } from '@/components/ui/spinner';

const defaultProps = {
  position: 'top-center',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  pauseOnFocusLoss: true,
  draggable: true,
  theme: 'dark',
  // transition: bounce,
};

export default function ContactForm({ theme, lang }) {
  const langObj = translations.contactForm;

  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    email: '',
    mobile: '',
    question: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleValueChange = (name) => (value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const requiredError = {
    tw: '此欄位為必填',
    cn: '此栏位为必填',
    en: 'This field is required',
  };

  const getRequiredError = (name) => {
    if (!submitted || formData[name]) return null;
    return requiredError[lang];
  };

  const submitToast = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);

    const requiredFields = ['name', 'gender', 'email', 'question', 'message'];
    if (requiredFields.some((field) => !formData[field])) return;

    setSubmitting(true);
    submitToast.current = toast.loading(langObj.submit.pending[lang], {...defaultProps});
    axios
      .post(`${process.env.baseUrl}/api/contact`, formData)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data.message)
          return toast.update(submitToast.current, {
            render: langObj.submit.success[lang],
            type: 'success',
            isLoading: false,
            ...defaultProps,
          });
        } else {
          return toast.update(submitToast.current, {
            render: langObj.submit.error[lang],
            type: 'error',
            isLoading: false,
            ...defaultProps,
          });
        }
      })
      .catch((error) => {
        console.log('error', error);
        return toast.update(submitToast.current, {
          render: langObj.submit.error[lang],
          type: 'error',
          isLoading: false,
          ...defaultProps,
        });
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <form className="mx-auto w-full max-w-3xl" onSubmit={handleSubmit}>
      <Card>
        <CardHeader className="border-b">
          <CardTitle>{langObj.heading[lang]}</CardTitle>
          <CardDescription>{langObj.description[lang]}</CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <div className="grid gap-5 md:grid-cols-2">
              <Field data-invalid={Boolean(getRequiredError('name'))}>
                <FieldLabel htmlFor="name">{langObj.form.name.title[lang]}</FieldLabel>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  aria-invalid={Boolean(getRequiredError('name'))}
                />
                <FieldError>{getRequiredError('name')}</FieldError>
              </Field>

              <Field data-invalid={Boolean(getRequiredError('email'))}>
                <FieldLabel htmlFor="email">{langObj.form.email.title[lang]}</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  aria-invalid={Boolean(getRequiredError('email'))}
                />
                <FieldError>{getRequiredError('email')}</FieldError>
              </Field>
            </div>

            <FieldSet data-invalid={Boolean(getRequiredError('gender'))}>
              <FieldLegend>{langObj.form.gender.title[lang]}</FieldLegend>
              <RadioGroup
                className="grid sm:grid-cols-3"
                value={formData.gender}
                onValueChange={handleValueChange('gender')}
                aria-invalid={Boolean(getRequiredError('gender'))}
              >
                {contactGenderOptions.map((option) => {
                  const id = `gender-${option.order}`;
                  return (
                    <FieldLabel key={option.order} htmlFor={id}>
                      <Field orientation="horizontal">
                        <RadioGroupItem
                          id={id}
                          value={option.value[lang]}
                          aria-invalid={Boolean(getRequiredError('gender'))}
                        />
                        <FieldContent>
                          <FieldTitle>{option.content[lang]}</FieldTitle>
                        </FieldContent>
                      </Field>
                    </FieldLabel>
                  );
                })}
              </RadioGroup>
              <FieldError>{getRequiredError('gender')}</FieldError>
            </FieldSet>

            <div className="grid gap-5 md:grid-cols-2">
              <Field>
                <div className="flex items-center justify-between gap-3">
                  <FieldLabel htmlFor="mobile">{langObj.form.mobile.title[lang]}</FieldLabel>
                  <Badge variant="secondary">{langObj.form.mobile.optional[lang]}</Badge>
                </div>
                <Input
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                />
                <FieldDescription>{langObj.form.mobile.description[lang]}</FieldDescription>
              </Field>

              <Field data-invalid={Boolean(getRequiredError('question'))}>
                <FieldLabel>{langObj.form.question.title[lang]}</FieldLabel>
                <Select
                  value={formData.question}
                  onValueChange={handleValueChange('question')}
                >
                  <SelectTrigger
                    className="w-full"
                    aria-invalid={Boolean(getRequiredError('question'))}
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {contactQuestionOptions.map((option) => (
                      <SelectItem
                        key={option.order}
                        value={option.value[lang]}
                        disabled={!option.value[lang]}
                      >
                        {option.content[lang]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldError>{getRequiredError('question')}</FieldError>
              </Field>
            </div>

            <Field data-invalid={Boolean(getRequiredError('message'))}>
              <FieldLabel htmlFor="message">{langObj.form.message.title[lang]}</FieldLabel>
              <Textarea
                id="message"
                name="message"
                rows={6}
                value={formData.message}
                onChange={handleChange}
                aria-invalid={Boolean(getRequiredError('message'))}
                className="min-h-32 resize-y"
              />
              <FieldDescription>{langObj.form.message.description[lang]}</FieldDescription>
              <FieldError>{getRequiredError('message')}</FieldError>
            </Field>
          </FieldGroup>
        </CardContent>
        <CardFooter className="flex-col-reverse justify-end gap-2 sm:flex-row">
            <Button
              type="reset"
              variant="outline"
              disabled={submitting}
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  name: '',
                  gender: '',
                  email: '',
                  mobile: '',
                  question: '',
                  message: '',
                });
              }}
            >
              <LiaRedoAltSolid />
              {langObj.form.actions.reset[lang]}
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? <Spinner /> : <LiaTelegramPlane />}
              {langObj.form.actions.submit[lang]}
            </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
