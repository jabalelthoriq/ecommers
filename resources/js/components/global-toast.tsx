import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function GlobalToast() {
    const { flash } = usePage<any>().props;

    useEffect(() => {
        if (!flash) return;

        if (flash.success) toast.success(flash.success);
        if (flash.error) toast.error(flash.error);
        if (flash.warning) toast.warning(flash.warning);
        if (flash.info) toast.info(flash.info);
        if (flash.status) toast.success(flash.status); 
        
    }, [flash]);

    return null;
}
