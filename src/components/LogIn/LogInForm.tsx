import { useMutation } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { modalAtom, userEmailAtom } from 'src/store/store';
import postLogIn from '../../apis/postLogIn';
import eye from '../../assets/images/eye.svg';
import noneEye from '../../assets/images/none-eye.svg';
import Button from '../Buttons/Button';
import Modal from '../Layout/Modal';

export default function LogInForm() {
  const [showEmailError, setShowEmailError] = useState<string | null>(null);
  const [showPasswordError, setShowPasswordError] = useState<string | null>(
    null
  );
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const setUserEmail = useSetAtom(userEmailAtom);
  const setModal = useSetAtom(modalAtom);

  // const [userEmail, setUserEmail] = useAtom(userEmailAtom);
  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      navigate('/mydashboard');
    }
  });

  const EmailError = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.validity.typeMismatch) {
      setShowEmailError('이메일 형식으로 작성해주세요.');
    } else {
      setShowEmailError('');
    }
  };
  const PasswordError = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.validity.tooShort) {
      setShowPasswordError('8자 이상 작성해주세요.');
    } else {
      setShowPasswordError('');
    }
  };
  const handleEye = () => {
    setShowPassword(!showPassword);
  };
  const { mutate } = useMutation({
    mutationKey: ['user'],
    mutationFn: postLogIn as any,
    onSuccess: (data: any) => {
      localStorage.setItem('accessToken', data.accessToken);
      setUserEmail(email);
      navigate('/mydashboard');
    },
    onError: (error: any) => {
      setModal(prev => ({ ...prev, status: true, name: 'alertPassword' }));
    }
  });

  const handlePostLogIn = (e: React.MouseEvent<HTMLButtonElement>) => {
    mutate({ email, password } as any);
  };
  return (
    <div className="flex flex-col mt-[3.8rem] tablet:w-[52rem] mobile:w-[35.1rem]">
      <label htmlFor="email" className="text-[1.6rem]">
        이메일
      </label>
      <input
        id="email"
        type="email"
        className={`basicinput border ${showEmailError ? 'border-red-500' : ''}`}
        onBlur={EmailError}
        placeholder="이메일을 입력해주세요."
        onChange={e => setEmail(e.target.value)}
      />
      {showEmailError && (
        <div className="text-red-500 text-[1.4rem]">{showEmailError}</div>
      )}
      <label htmlFor="password" className="text-[1.6rem] relative mt-[1.6rem]">
        비밀번호
        <button
          type="button"
          className="absolute right-[1.6rem] top-[3.5rem]"
          onClick={handleEye}
        >
          {!showPassword ? (
            <img src={eye} alt="eye" />
          ) : (
            <img src={noneEye} alt="noneEye" />
          )}
        </button>
      </label>
      <input
        id="password"
        type={showPassword ? 'text' : 'password'}
        className={`basicinput  border ${showPasswordError ? 'border-red-500' : ''}`}
        onBlur={PasswordError}
        minLength={8}
        placeholder="비밀번호를 입력해주세요."
        onChange={e => setPassword(e.target.value)}
      />

      {showPasswordError && (
        <div className="text-red-500 text-[1.4rem]">{showPasswordError}</div>
      )}
      <Button
        variant="primary"
        type="button"
        customStyles=" h-[5rem] text-[1.8rem] rounded-[0.4rem] mb-[2rem] mt-[2rem] w-full"
        disabled={!email || !password}
        onClick={handlePostLogIn}
      >
        로그인
      </Button>
      <Modal />
    </div>
  );
}
