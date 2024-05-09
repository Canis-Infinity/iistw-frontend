import { useState, useRef, Fragment } from 'react';
import { RiInformationFill, RiArrowDownSLine } from 'react-icons/ri';
import { LiaTelegramPlane, LiaRedoAltSolid } from 'react-icons/lia';
import styles from './index.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

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
  const langObj = {
    submit: {
      pending: {
        tw: `聯絡表單提交中`,
        cn: `联络表单提交中`,
        en: `Contact form submission in progress`,
      },
      success: {
        tw: `聯絡表單提交成功`,
        cn: `联络表单提交成功`,
        en: `Contact form submitted successfully`,
      },
      error: {
        tw: `聯絡表單提交失敗`,
        cn: `联络表单提交失败`,
        en: `Contact form submission failed`,
      },
    },
    form: {
      name: {
        title: {
          tw: `姓名`,
          cn: `姓名`,
          en: `what's your name?`,
        },
        description: {
          tw: `建議留全名，以利於聯絡，也可留下暱稱。`,
          cn: `建议留全名，以利于联络，也可留下昵称。`,
          en: `I recommend leaving your full name for contact, or you can leave your nickname.`,
        },
      },
      gender: {
        title: {
          tw: `性別`,
          cn: `性别`,
          en: `what's your gender?`,
        },
        option: [
          {
            order: 1,
            value: {
              tw: `男性`,
              cn: `男性`,
              en: `Male`,
            },
            content: {
              tw: `男性`,
              cn: `男性`,
              en: `Male`,
            },
          },
          {
            order: 2,
            value: {
              tw: `女性`,
              cn: `女性`,
              en: `Female`,
            },
            content: {
              tw: `女性`,
              cn: `女性`,
              en: `Female`,
            },
          },
          {
            order: 3,
            value: {
              tw: `第三性`,
              cn: `第三性`,
              en: `Third`,
            },
            content: {
              tw: `第三性`,
              cn: `第三性`,
              en: `Third`,
            },
          },
        ],
        description: {
          tw: `請選擇您的性別，讓我們能夠更好地稱呼您。`,
          cn: `请选择您的性别，让我们能够更好地称呼您。`,
          en: `Please choose your gender so that we can call you better.`,
        },
      },
      email: {
        title: {
          tw: `信箱`,
          cn: `信箱`,
          en: `what's your email address?`,
        },
        description: {
          tw: `若擔心無法收到回覆，建議將 iistw22788@gmail.com 加入信任名單。`,
          cn: `若担心无法收到回覆，建议将 iistw22788@gmail.com 加入信任名单。`,
          en: `If you are worried about not receive a reply, I recommend adding “iistw22788@gmail.com” to email whitelist.`,
        },
      },
      mobile: {
        title: {
          tw: `手機`,
          cn: `手机`,
          en: `what's your mobile?`,
        },
        description: {
          tw: `如果您住在臺灣，也可以選擇留下手機號碼，方便我們聯絡。`,
          cn: `如果您住在台湾，也可以选择留下手机号码，方便我们联络。`,
          en: `If you live in Taiwan, you can also leave your mobile phone number for us to contact you.`,
        },
        optional: {
          tw: `選填`,
          cn: `选填`,
          en: `optional`,
        },
      },
      question: {
        title: {
          tw: `類型`,
          cn: `类型`,
          en: `what's your message type?`,
        },
        description: {
          tw: `選擇一個類型，可以讓我們更加高效的定位問題。`,
          cn: `选择一个类型，可以让我们更加高效的定位问题。`,
          en: `Choose a message type to help us locate the problem more efficiently.`,
        },
        option: [
          {
            order: 1,
            value: {
              tw: ``,
              cn: ``,
              en: ``,
            },
            content: {
              tw: `請選擇一個最適合的問題`,
              cn: `请选择一个最适合的问题`,
              en: `Please choose the most suitable question`,
            },
          },
          {
            order: 2,
            value: {
              tw: `網站問題`,
              cn: `网站问题`,
              en: `Website problem`,
            },
            content: {
              tw: `網站問題`,
              cn: `网站问题`,
              en: `Website problem`,
            },
          },
          {
            order: 3,
            value: {
              tw: `電腦／筆電／零組件購買問題`,
              cn: `电脑／笔电／零组件购买问题`,
              en: `Computer / laptop / component purchase problem`,
            },
            content: {
              tw: `電腦／筆電／零組件購買問題`,
              cn: `电脑／笔电／零组件购买问题`,
              en: `Computer / laptop / component purchase problem`,
            },
          },
          {
            order: 4,
            value: {
              tw: `電腦／筆電維修問題`,
              cn: `电脑／笔电维修问题`,
              en: `Computer / laptop repair problem`,
            },
            content: {
              tw: `電腦／筆電維修問題`,
              cn: `电脑／笔电维修问题`,
              en: `Computer / laptop repair problem`,
            },
          },
          {
            order: 5,
            value: {
              tw: `網站建議`,
              cn: `网站建议`,
              en: `Website suggestion`,
            },
            content: {
              tw: `網站建議`,
              cn: `网站建议`,
              en: `Website suggestion`,
            },
          },
          {
            order: 6,
            value: {
              tw: `其它`,
              cn: `其它`,
              en: `Other`,
            },
            content: {
              tw: `其它`,
              cn: `其它`,
              en: `Other`,
            },
          },
        ],
      },
      message: {
        title: {
          tw: `訊息`,
          cn: `信息`,
          en: `message`,
        },
        description: {
          tw: `請詳細描述您的問題、需求，以利於我們更加了解您的需求。建議使用中文或英文。`,
          cn: `请详细描述您的问题、需求，以利于我们更加了解您的需求。建议使用中文或英文。`,
          en: `Please describe your problem or needs in detail here to help us better understand your needs. I recommend using Chinese or English.`,
        },
      },
      actions: {
        submit: {
          tw: `提交`,
          cn: `提交`,
          en: `submit`,
        },
        reset: {
          tw: `重設`,
          cn: `重设`,
          en: `reset`,
        },
      },
    },
  };

  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    email: '',
    mobile: '',
    question: '',
    message: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitToast = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
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
      });
  };

  return (
    <form
      className={styles.form}
      onChange={handleChange}
      onSubmit={handleSubmit}
    >
      <div className={styles.field}>
        <label htmlFor="name" className={styles.fieldTitle}>
          {langObj.form.name.title[lang]}
        </label>
        <input type="text" name="name" id="name" required />
        <div className={styles.description}>
          <RiInformationFill />
          <p>{langObj.form.name.description[lang]}</p>
        </div>
      </div>
      <div className={styles.field}>
        <div className={styles.fieldTitle}>
          {langObj.form.gender.title[lang]}
        </div>
        <div className={styles.inputs}>
          {langObj.form.gender.option.map((option) => {
            return (
              <Fragment key={option.order}>
                <input
                  type="radio"
                  name="gender"
                  id={`gender${option.order}`}
                  className={styles.radio}
                  value={option.value[lang]}
                />
                <label htmlFor={`gender${option.order}`}>
                  {option.content[lang]}
                </label>
              </Fragment>
            );
          })}
        </div>
        <div className={styles.description}>
          <RiInformationFill />
          <p>{langObj.form.gender.description[lang]}</p>
        </div>
      </div>
      <div className={styles.field}>
        <label htmlFor="email" className={styles.fieldTitle}>
          {langObj.form.email.title[lang]}
        </label>
        <input type="email" name="email" id="email" required />
        <div className={styles.description}>
          <RiInformationFill />
          <p>{langObj.form.email.description[lang]}</p>
        </div>
      </div>
      <div className={styles.field}>
        <label
          htmlFor="mobile"
          className={styles.fieldTitle}
          data-optional={langObj.form.mobile.optional[lang]}
        >
          {langObj.form.mobile.title[lang]}
        </label>
        <input type="text" name="mobile" id="mobile" />
        <div className={styles.description}>
          <RiInformationFill />
          <p>{langObj.form.mobile.description[lang]}</p>
        </div>
      </div>
      <div className={styles.field}>
        <div className={styles.fieldTitle}>
          {langObj.form.question.title[lang]}
        </div>
        <div className={styles.selectInput}>
          <select name="question" required>
            {langObj.form.question.option.map((option) => {
              return (
                <option value={option.value[lang]} key={option.order}>
                  {option.content[lang]}
                </option>
              );
            })}
          </select>
          <RiArrowDownSLine />
        </div>
        <div className={styles.description}>
          <RiInformationFill />
          <p>{langObj.form.question.description[lang]}</p>
        </div>
      </div>
      <div className={styles.field}>
        <label htmlFor="message" className={styles.fieldTitle}>
          {langObj.form.message.title[lang]}
        </label>
        <textarea name="message" id="message" rows="10" required></textarea>
        <div className={styles.description}>
          <RiInformationFill />
          <p>{langObj.form.message.description[lang]}</p>
        </div>
      </div>
      <div className={styles.actions}>
        <button type="submit" className={styles.primary}>
          <LiaTelegramPlane />
          {langObj.form.actions.submit[lang]}
        </button>
        <button type="reset" className={styles.secondary}>
          <LiaRedoAltSolid />
          {langObj.form.actions.reset[lang]}
        </button>
      </div>
    </form>
  );
}
