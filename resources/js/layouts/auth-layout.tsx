import AuthLayoutTemplate from '@/layouts/auth/auth-simple-layout';
import GlobalToast from '@/components/global-toast';

interface AuthLayoutProps {
    children: React.ReactNode;
    title: string;
    description: string;
}

export default function AuthLayout({ children, title, description, ...props }: AuthLayoutProps) {
    return (
        <AuthLayoutTemplate title={title} description={description} {...props}>
            <GlobalToast />
            {children}
        </AuthLayoutTemplate>
    );
}
