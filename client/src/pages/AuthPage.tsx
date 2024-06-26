import React, {useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {LayoutWrapper} from "../components/Layout";
import styled from "styled-components";
import {MessageBox} from "../components/MessageBox";
import {useNavigate} from "react-router-dom";
import {Input} from "../components/Input";

type AuthForm = {
    name: string;
    password: string;
    isValid?: boolean;
    success?: boolean;
}

const initialState = {
    name: '',
    password: '',
    isValid: true,
    success: false,
}

export const AuthPage: React.FC = () => {
    const {loading, request} = useHttp();
    const [form, setForm] = useState<AuthForm>(initialState);
    const navigate = useNavigate();

    const changeHandler = (event: any) => setForm({...form, [event.target.name]: event.target.value});

    const signIn = async (e: any) => {
        e.preventDefault();

        if (await auth()) {
            setForm({...form, success: true});
            navigate('/admin', {
                state: {admin: true}
            });
        } else {
            setForm({...form, password: '', isValid: false});
        }

        setTimeout(() => setForm(() => initialState), 2000);
    }

    const auth = async (): Promise<boolean> => {
        try {
            await request('/api/auth', 'POST', {
                adminName: form.name,
                adminPass: form.password,
            });
            return true;
        } catch (e) {
            return false;
        }
    }

    return (
        <LayoutWrapper>
            <AuthWrapper>
                <form onSubmit={signIn}>
                    <Input
                        disabled={loading}
                        placeholder='Enter your name'
                        isValid={form.isValid}
                        value={form.name}
                        name='name'
                        onChange={changeHandler}
                    />
                    <Input
                        disabled={loading}
                        placeholder='Password'
                        isValid={form.isValid}
                        value={form.password}
                        name='password'
                        type='password'
                        autoComplete='false'
                        onChange={changeHandler}
                    />
                    <Input
                        disabled={loading || !(form.name && form.password)}
                        value='Sign In'
                        type='submit'
                        isValid={true}
                    />
                    <div style={{
                        position: "absolute",
                    }}>
                        {!form.isValid && <MessageBox message={'Wrong name or pass!'} state={false}/>}
                        {form.success && <MessageBox message={'Success!'}/>}
                    </div>
                </form>
            </AuthWrapper>
        </LayoutWrapper>
    )
}

const AuthWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`
