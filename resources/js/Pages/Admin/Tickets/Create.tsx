import { Head, useForm } from '@inertiajs/react';
import { useTranslation } from '@/Contexts/TranslationContext';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { FormEventHandler } from 'react';
import { PageProps } from '@/types';
import { FaTicketAlt, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';

interface Props extends PageProps {
    statuses: string[];
    priorities: string[];
    categories: string[];
    user?: {
        id: number;
        name: string;
        email: string;
    };
    subject?: string;
    message?: string;
    category?: string;
    priority?: string;
}

export default function Create({ 
    statuses, 
    priorities, 
    categories, 
    user,
    subject = '',
    message = '',
    category = 'general',
    priority = 'medium' 
}: Props) {
    const { t } = useTranslation();
    const { data, setData, post, processing, errors, reset } = useForm({
        subject: subject,
        message: message,
        priority: priority,
        category: category,
        user_id: user?.id || '',
        attachments: [] as File[],
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        
        Object.keys(data).forEach((key) => {
            if (key === 'attachments') {
                data.attachments.forEach((file) => {
                    formData.append('attachments[]', file);
                });
            } else {
                formData.append(key, data[key as keyof typeof data]?.toString() || '');
            }
        });

        post(route('management.admin.tickets.store'), {
            data: formData,
            onSuccess: () => {
                toast.success(t('tickets.created'));
                reset();
            },
            onError: () => {
                toast.error(t('tickets.createError'));
            },
        });
    };

    return (
        <AuthenticatedLayout
            auth={{
                user: {
                    id: 0,
                    name: '',
                    email: '',
                    roles: []
                }
            }}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    {t('tickets.createNew')} {user && `- ${user.name}`}
                </h2>
            }
        >
            <Head title={t('tickets.createNew')} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-6">
                            <form onSubmit={handleSubmit} encType="multipart/form-data">
                                {/* Konu */}
                                <div className="mb-6">
                                    <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-100">
                                        {t('tickets.subject')}
                                    </label>
                                    <input
                                        type="text"
                                        value={data.subject}
                                        onChange={(e) => setData('subject', e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-indigo-500 dark:focus:ring-indigo-500"
                                        required
                                    />
                                    {errors.subject && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.subject}
                                        </p>
                                    )}
                                </div>

                                {/* Mesaj */}
                                <div className="mb-6">
                                    <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-100">
                                        {t('tickets.message')}
                                    </label>
                                    <textarea
                                        value={data.message}
                                        onChange={(e) => setData('message', e.target.value)}
                                        rows={6}
                                        className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-indigo-500 dark:focus:ring-indigo-500"
                                        required
                                    />
                                    {errors.message && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.message}
                                        </p>
                                    )}
                                </div>

                                {/* Öncelik */}
                                <div className="mb-6">
                                    <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-100">
                                        {t('tickets.priority')}
                                    </label>
                                    <select
                                        value={data.priority}
                                        onChange={(e) => setData('priority', e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-indigo-500 dark:focus:ring-indigo-500"
                                    >
                                        {priorities.map((priority) => (
                                            <option key={priority} value={priority}>
                                                {t(`tickets.priorities.${priority}`)}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Kategori */}
                                <div className="mb-6">
                                    <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-100">
                                        {t('tickets.category')}
                                    </label>
                                    <select
                                        value={data.category}
                                        onChange={(e) => setData('category', e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-indigo-500 dark:focus:ring-indigo-500"
                                    >
                                        {categories.map((category) => (
                                            <option key={category} value={category}>
                                                {t(`tickets.categories.${category}`)}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Dosya Yükleme */}
                                <div className="mb-6">
                                    <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-100">
                                        {t('tickets.attachments')}
                                    </label>
                                    <input
                                        type="file"
                                        multiple
                                        onChange={(e) => {
                                            const files = Array.from(e.target.files || []);
                                            setData('attachments', files);
                                        }}
                                        className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-indigo-500 dark:focus:ring-indigo-500"
                                    />
                                </div>

                                {/* Gönder Butonu */}
                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
                                    >
                                        <FaTicketAlt className="mr-2 h-4 w-4" />
                                        {processing ? t('common.processing') : t('tickets.create')}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
} 