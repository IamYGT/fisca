import { useTranslation } from '@/Contexts/TranslationContext';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {
    ArrowTrendingUpIcon,
    BanknotesIcon,
    CheckCircleIcon,
    ClockIcon,
    CurrencyDollarIcon,
    ChatBubbleLeftIcon,
} from '@heroicons/react/24/outline';
import { Head, Link, router } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import 'react-circular-progressbar/dist/styles.css';
import { FaChartPie, FaExchangeAlt, FaUserPlus, FaMoneyBillWave } from 'react-icons/fa';
import { toast } from 'react-toastify';
import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

interface DashboardStats {
    transactions: {
        total: number;
        pending: number;
        completed: number;
        totalAmount: number;
        totalAmount_usd: number;
        totalWithdrawn_usd: number;
        exchange_rate: number;
    };
    users: {
        total: number;
        activeToday: number;
        newThisWeek: number;
    };
    tickets: {
        total: number;
        open: number;
        answered: number;
        closed: number;
    };
    ibans: Array<{
        id: number;
        bank_name: string;
        iban: string;
        is_default: boolean;
    }>;
    recentActivity: Array<{
        id: number;
        type: 'transaction' | 'ticket' | 'withdrawal';
        user: string;
        amount?: number;
        amount_usd?: number;
        status: string;
        created_at: string;
        isLast?: boolean;
    }>;
}

interface PageProps {
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
            roles: Array<{ name: string }>;
        };
    };
    stats: DashboardStats;
    showWelcomeToast?: boolean;
}

interface StatCardProps {
    title: string;
    value: string | number;
    icon: React.ComponentType<{ className?: string }>;
    change?: string;
    color: string;
}

interface SummaryCardProps {
    title: string;
    value: string | number;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
}

interface ChartDataPoint {
    name: string;
    value: number;
}

interface QuickAction {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    href: string;
    color: string;
    hoverColor: string;
}

const StatCard = ({
    title,
    value,
    icon: Icon,
    change,
    color,
}: StatCardProps) => (
    <motion.div
        whileHover={{ scale: 1.02 }}
        className={`group relative overflow-hidden rounded-xl bg-gradient-to-br ${color} p-3 sm:p-6 shadow-lg transition-all duration-300`}
    >
        <div className="relative z-10 flex items-center justify-between">
            <div>
                <h3 className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300">
                    {title}
                </h3>
                <p className="mt-1 sm:mt-2 text-lg sm:text-3xl font-bold text-gray-900 dark:text-white">
                    {value}
                </p>
                {change && (
                    <p
                        className={`mt-1 text-xs sm:text-sm ${change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}
                    >
                        {change}
                    </p>
                )}
            </div>
            <div className="rounded-full bg-white/20 p-2 sm:p-3 shadow-inner transition-transform group-hover:scale-110 dark:bg-gray-800/20">
                <Icon className="h-5 w-5 sm:h-8 sm:w-8 text-gray-700 dark:text-gray-300" />
            </div>
        </div>
        <div className="absolute -right-4 -top-4 h-16 w-16 sm:h-32 sm:w-32 rounded-full bg-white/10 transition-transform group-hover:scale-110" />
    </motion.div>
);

const ActivityItem = ({
    activity,
}: {
    activity: DashboardStats['recentActivity'][0];
}) => {
    const { t } = useTranslation();

    // Aktivite tiplerine göre rotaları belirle
    const getActivityRoute = (activity: DashboardStats['recentActivity'][0]) => {
        switch (activity.type) {
            case 'transaction':
                return route('user.transactions.show', { transaction: activity.id });
            case 'withdrawal':
                return route('user.withdrawals.create');
            case 'ticket':
                return route('user.tickets.show', { ticket: activity.id });
            default:
                return '#';
        }
    };

    // Aktivite tiplerine göre özel renkler ve ikonlar
    const activityStyles = {
        transaction: {
            icon: BanknotesIcon,
            baseColor: 'text-blue-600 dark:text-blue-400',
            bgColor: 'bg-blue-50 dark:bg-blue-400/10',
            borderColor: 'border-blue-100 dark:border-blue-400/20'
        },
        withdrawal: {
            icon: ArrowTrendingUpIcon,
            baseColor: 'text-green-600 dark:text-green-400',
            bgColor: 'bg-green-50 dark:bg-green-400/10',
            borderColor: 'border-green-100 dark:border-green-400/20'
        },
        ticket: {
            icon: ChatBubbleLeftIcon,
            baseColor: 'text-purple-600 dark:text-purple-400',
            bgColor: 'bg-purple-50 dark:bg-purple-400/10',
            borderColor: 'border-purple-100 dark:border-purple-400/20'
        }
    };

    const style = activityStyles[activity.type];
    const Icon = style.icon;

    // Zaman formatlaması için yardımcı fonksiyon
    const formatTime = (dateString: string) => {
        try {
            const date = new Date(dateString);
            const now = new Date();

            // Geçerli bir tarih olup olmadığını kontrol edelim
            if (isNaN(date.getTime())) {
                return dateString; // Geçersiz tarih ise orijinal string'i döndür
            }

            const diffInMinutes = Math.floor((date.getTime() - now.getTime()) / (1000 * 60));
            const diffInHours = Math.floor(diffInMinutes / 60);
            const diffInDays = Math.floor(diffInHours / 24);

            const rtf = new Intl.RelativeTimeFormat('tr', { numeric: 'auto' });

            if (Math.abs(diffInMinutes) < 60) {
                return rtf.format(diffInMinutes, 'minute');
            } else if (Math.abs(diffInHours) < 24) {
                return rtf.format(diffInHours, 'hour');
            } else if (Math.abs(diffInDays) < 30) {
                return rtf.format(diffInDays, 'day');
            } else {
                // 30 günden eski ise normal tarih formatında göster
                return new Intl.DateTimeFormat('tr', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                }).format(date);
            }
        } catch (error) {
            console.error('Date formatting error:', error);
            return dateString; // Hata durumunda orijinal string'i döndür
        }
    };

    return (
        <Link href={getActivityRoute(activity)}>
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`group relative flex items-start gap-4 rounded-xl border p-4 mb-4
                    transition-all duration-300
                    hover:shadow-lg hover:scale-[1.01]
                    dark:border-gray-700/50 ${style.borderColor}
                    cursor-pointer
                    hover:bg-gray-50/90 dark:hover:bg-gray-700/50
                    bg-white/95 dark:bg-gray-800/95
                    backdrop-blur-sm
                    border-l-4 ${style.borderColor}`}
            >
                {/* Sol taraf - İkon */}
                <div className="relative shrink-0">
                    <div className={`rounded-full p-2.5 ${style.bgColor} shadow-sm ring-4 ring-white dark:ring-gray-800`}>
                        <Icon className={`h-4 w-4 ${style.baseColor}`} />
                    </div>
                    {/* Zaman çizgisi indikatörü - Son öğe değilse göster */}
                    {!activity.isLast && (
                        <div className="absolute left-1/2 top-12 h-full w-0.5 -translate-x-1/2
                            bg-gradient-to-b from-gray-200 to-transparent
                            dark:from-gray-700"
                        />
                    )}
                </div>

                {/* Orta kısım - Ana içerik */}
                <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                            <h4 className="font-medium text-gray-900 dark:text-gray-100 truncate">
                                {activity.user}
                            </h4>
                            <span className="shrink-0 text-sm text-gray-500 dark:text-gray-400">
                                • {formatTime(activity.created_at)}
                            </span>
                        </div>
                        {activity.amount_usd && (
                            <div className="sm:ml-auto">
                                <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-sm font-semibold
                                    shadow-sm ring-1 ring-inset
                                    ${activity.status === 'completed'
                                        ? 'bg-green-50 text-green-700 ring-green-600/20 dark:bg-green-400/10 dark:text-green-400 dark:ring-green-400/30'
                                        : 'bg-gray-50 text-gray-700 ring-gray-600/20 dark:bg-gray-400/10 dark:text-gray-400 dark:ring-gray-400/30'}`}>
                                    {new Intl.NumberFormat('en-US', {
                                        style: 'currency',
                                        currency: 'USD'
                                    }).format(activity.amount_usd)}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Aktivite açıklaması */}
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                        {t(`activity.${activity.type}`, {
                            amount: activity.amount_usd
                                ? new Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: 'USD'
                                }).format(activity.amount_usd)
                                : '-'
                        })}
                    </p>

                    {/* Durum etiketi */}
                    <div className="mt-2">
                        <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium
                            shadow-sm ring-1 ring-inset
                            ${activity.status === 'completed'
                                ? 'bg-green-50 text-green-700 ring-green-600/20 dark:bg-green-400/10 dark:text-green-400 dark:ring-green-400/30'
                                : activity.status === 'pending'
                                    ? 'bg-amber-50 text-amber-700 ring-amber-600/20 dark:bg-amber-400/10 dark:text-amber-400 dark:ring-amber-400/30'
                                    : 'bg-red-50 text-red-700 ring-red-600/20 dark:bg-red-400/10 dark:text-red-400 dark:ring-red-400/30'}`}>
                            <span className="relative flex h-2 w-2">
                                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75
                                    ${activity.status === 'completed' ? 'bg-green-400' :
                                    activity.status === 'pending' ? 'bg-amber-400' : 'bg-red-400'}`}
                                />
                                <span className={`relative inline-flex rounded-full h-2 w-2
                                    ${activity.status === 'completed' ? 'bg-green-500' :
                                    activity.status === 'pending' ? 'bg-amber-500' : 'bg-red-500'}`}
                                />
                            </span>
                            {t(`status.${activity.status}`)}
                        </span>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
};

const SummaryCard = ({
    title,
    value,
    description,
    icon: Icon,
    color,
}: SummaryCardProps) => (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="flex items-start justify-between">
            <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {title}
                </p>
                <h4 className="mt-1 text-xl font-bold text-gray-900 dark:text-gray-100">
                    {value}
                </h4>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {description}
                </p>
            </div>
            <div className={`rounded-full p-3 ${color} bg-opacity-10`}>
                <Icon className="h-6 w-6" />
            </div>
        </div>
    </div>
);

const TransactionChart = ({ data }: { data: ChartDataPoint[] }) => {
    const { t } = useTranslation();

    return (
        <div className="rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
            <h3 className="mb-6 text-lg font-medium text-gray-900 dark:text-gray-100">
                {t('dashboard.transactionTrend')}
            </h3>
            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <CartesianGrid
                            strokeDasharray="3 3"
                            className="stroke-gray-200 dark:stroke-gray-700"
                        />
                        <XAxis
                            dataKey="name"
                            className="text-gray-600 dark:text-gray-400"
                        />
                        <YAxis className="text-gray-600 dark:text-gray-400" />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                border: 'none',
                                borderRadius: '0.5rem',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                            }}
                        />
                        <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

const UserWelcome = ({ userName }: { userName: string }) => {
    const { t } = useTranslation();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 p-4 sm:p-8 shadow-lg"
        >
            <div className="relative z-10">
                <h1 className="text-xl sm:text-3xl font-bold text-white">
                    {t('dashboard.welcome', { name: userName })}
                </h1>
            </div>
            <div className="absolute -right-10 -top-10 h-32 sm:h-64 w-32 sm:w-64 rounded-full bg-white/10" />
            <div className="absolute -bottom-10 -left-10 h-32 sm:h-64 w-32 sm:w-64 rounded-full bg-white/10" />
        </motion.div>
    );
};

const IbanList = ({ ibans }: { ibans: DashboardStats['ibans'] }) => {
    const { t } = useTranslation();

    return (
        <div className="rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 sm:p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-gray-100">
                        {t('dashboard.myIbans')}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {t('dashboard.registeredIbans')}
                    </p>
                </div>
                <Link
                    href={route('user.profile.ibans.index')}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-100 dark:bg-blue-400/10 dark:text-blue-400 dark:hover:bg-blue-400/20 transition-colors duration-200"
                >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    {t('common.addNew')}
                </Link>
            </div>

            <div className="space-y-3">
                {ibans.map((iban) => (
                    <motion.div
                        key={iban.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="group relative overflow-hidden rounded-xl border border-gray-100 bg-white p-4
                            transition-all duration-200 hover:shadow-md dark:border-gray-700 dark:bg-gray-800/50
                            hover:border-blue-100 dark:hover:border-blue-900/50"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-start space-x-4">
                                {/* Banka İkonu/Avatar */}
                                <div className="flex-shrink-0">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50
                                        dark:bg-gray-700/50 text-gray-400 dark:text-gray-500">
                                        <BanknotesIcon className="h-6 w-6" />
                                    </div>
                                </div>

                                {/* IBAN Bilgileri */}
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-2">
                                        <h4 className="truncate font-medium text-gray-900 dark:text-gray-100">
                                            {iban.bank_name}
                                        </h4>
                                        {iban.is_default && (
                                            <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-0.5 text-xs
                                                font-medium text-green-700 ring-1 ring-inset ring-green-600/20
                                                dark:bg-green-400/10 dark:text-green-400 dark:ring-green-400/30">
                                                {t('common.default')}
                                            </span>
                                        )}
                                    </div>
                                    <div className="mt-1 flex items-center gap-2">
                                        <p className="font-mono text-sm text-gray-600 dark:text-gray-400">
                                            {iban.iban.replace(/(.{4})/g, '$1 ')}
                                        </p>
                                        <button
                                            onClick={() => navigator.clipboard.writeText(iban.iban)}
                                            className="rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-700
                                                text-gray-400 hover:text-gray-600 dark:text-gray-500
                                                dark:hover:text-gray-300 transition-colors"
                                            title={t('common.copyToClipboard')}
                                        >
                                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                    d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                {/* Aksiyonlar */}
                                <div className="ml-4 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Link
                                        href={route('user.profile.ibans.index')}
                                        className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700
                                            text-gray-400 hover:text-gray-600 dark:text-gray-500
                                            dark:hover:text-gray-300 transition-colors"
                                    >
                                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default function Dashboard({ auth, stats }: PageProps) {
    const { t } = useTranslation();

    const quickActions: QuickAction[] = [
        {
            icon: FaExchangeAlt,
            label: t('dashboard.transactions'),
            href: route('user.transactions.history'),
            color: 'from-blue-500 to-blue-600',
            hoverColor: 'hover:from-blue-600 hover:to-blue-700'
        },
        {
            label: t('dashboard.actions.withdraw'),
            href: route('user.withdrawals.create'),
            icon: FaMoneyBillWave,
            color: 'from-green-600 to-green-700',
            hoverColor: 'hover:from-green-700 hover:to-green-800'
        },
        {
            label: t('dashboard.actions.tickets'),
            href: route('user.tickets.index'),
            icon: ChatBubbleLeftIcon,
            color: 'from-purple-600 to-purple-700',
            hoverColor: 'hover:from-purple-700 hover:to-purple-800'
        },
        {
            icon: BanknotesIcon,
            label: t('dashboard.ibanManagement'),
            href: route('user.profile.ibans.index'),
            color: 'from-purple-500 to-purple-600',
            hoverColor: 'hover:from-purple-600 hover:to-purple-700'
        }
    ];

    return (
        <AuthenticatedLayout
            auth={auth}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    {t('dashboard')}
                </h2>
            }
        >
            <Head title={t('dashboard')} />

            <div className="py-6 sm:py-12">
                <div className="mx-auto max-w-7xl space-y-4 sm:space-y-6 px-4 sm:px-6 lg:px-8">
                    <UserWelcome userName={auth.user.name} />

                    <div className="grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-4">
                        <StatCard
                            title={t('dashboard.totalTransactions')}
                            value={stats.transactions.total}
                            icon={BanknotesIcon}
                            color="from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30"
                        />
                        <StatCard
                            title={t('dashboard.totalWithdrawn')}
                            value={new Intl.NumberFormat('en-US', {
                                style: 'currency',
                                currency: 'USD',
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            }).format(stats.transactions.totalWithdrawn_usd)}
                            icon={CurrencyDollarIcon}
                            color="from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30"
                        />
                        <StatCard
                            title={t('dashboard.pendingTransactions')}
                            value={stats.transactions.pending}
                            icon={ClockIcon}
                            color="from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30"
                        />
                        <StatCard
                            title={t('dashboard.openTickets')}
                            value={stats.tickets.open}
                            icon={ChatBubbleLeftIcon}
                            color="from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30"
                        />
                    </div>

                    <div className="rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 sm:p-6 shadow-lg">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-gray-100">
                                {t('dashboard.recentActivity')}
                            </h3>
                            <Link
                                href={route('user.transactions.history')}
                                className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                            >
                                {t('common.viewAll')}
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                        <div className="space-y-4">
                            {stats.recentActivity.slice(0, 3).map((activity, index, array) => (
                                <ActivityItem
                                    key={`${activity.type}-${activity.id}`}
                                    activity={{
                                        ...activity,
                                        isLast: index === array.length - 1
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-4">
                        {quickActions.map((action, index) => (
                            <Link key={index} href={action.href} className="block">
                                <motion.div
                                    whileHover={{ scale: 1.03 }}
                                    className={`group relative overflow-hidden rounded-xl bg-gradient-to-br ${action.color} p-4 sm:p-6 shadow-lg transition-all duration-300 ${action.hoverColor}`}
                                >
                                    <div className="relative z-10 flex flex-col items-center space-y-2 sm:space-y-3 text-white">
                                        <action.icon className="h-6 w-6 sm:h-8 sm:w-8 transition-transform group-hover:scale-110" />
                                        <span className="text-xs sm:text-sm font-medium text-center">{action.label}</span>
                                    </div>
                                    <div className="absolute -right-4 -top-4 h-16 w-16 sm:h-24 sm:w-24 rounded-full bg-white/10 transition-transform group-hover:scale-110" />
                                </motion.div>
                            </Link>
                        ))}
                    </div>

                    <IbanList ibans={stats.ibans} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

