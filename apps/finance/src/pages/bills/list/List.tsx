'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { yearValidator } from '@repo/services/validator/date/date';
import { ValidatorMessage } from '@repo/services/validator/interface';

import Bill from '@repo/business/finance/bill';
import Bank from '@repo/business/finance/bank/bank';
import BillCategory from '@repo/business/finance/bill-category';
import { EBillType } from '@repo/business';

import Tabs from '@repo/ds/components/tabs/Tabs';
import Spinner from '@repo/ds/elements/spinner/Spinner';
import Select from '@repo/ds/components/select/Select';
import Button from '@repo/ds/components/button/Button';

import useAlert from '@repo/ui/hooks/alert/useAlert';
import Input from '@repo/ui/components/input/Input';

import { billService } from '../../../shared';

import { SubTab } from '../components';

import { CRUDHeader, DependencyFallback } from '../../../layout';

import CRUDModal from '../../../layout/components/CRUDModal';

import useBill from '../useBill';

import './list.scss';

type BillParams = {
    id?: string;
    year?: number;
    type?: EBillType;
    bank?: Bank;
    category?: BillCategory;
};

type BillFormErrors = {
    year?: ValidatorMessage;
    type?: ValidatorMessage;
    bank?: ValidatorMessage;
    category?: ValidatorMessage;
};

export default function BillPage() {
    const { addAlert } = useAlert();
    const {
        save,
        banks,
        reload,
        categories,
        handleReload,
        billListCategory,
        hasAllDependencies,
    } = useBill();
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [fields, setFields] = useState<BillParams>({
        year: new Date().getFullYear(),
    });
    const [errors, setErrors] = useState<Partial<BillFormErrors>>({
        year: {
            valid: true,
            message: '',
        },
        type: {
            valid: true,
            message: 'Please select a type.',
        },
        bank: {
            valid: true,
            message: 'Please select a bank.',
        },
        category: {
            valid: true,
            message: 'Please select a category.',
        },
    });

    const fetchBills = () => {
        setLoading(true);
        billService
            .getAll({})
            .then((response) => save(response as Array<Bill>))
            .catch((error) => {
                addAlert({
                    type: 'error',
                    message: error?.message ?? 'Unable to fetch bills',
                });
                save([]);
            }).finally(() => {
            setTimeout(() => { setLoading(false); }, 500)
            handleReload(false);
        });
    };

    const openModal = (item?: Bill) => {
        setFields({
            year: item?.year ?? new Date().getFullYear(),
            type: item?.type,
            bank: item?.bank,
            category: item?.category,
        });
        setIsModalVisible(true);
    };

    const treatValue = (key: keyof BillParams, value: string) => {
        switch (key) {
            case 'year':
                return parseInt(value);
            case 'type':
                return value as EBillType;
            case 'bank':
                return banks.find((item) => item.id === value) ?? '';
            case 'category':
                return categories.find((item) => item.id === value);
            default:
                return value;
        }
    };

    const handleChange = (key: keyof BillParams, value: string): void => {
        const valueTreated = treatValue(key, value);
        setFields((prev) => ({ ...prev, [key]: valueTreated }));
    };

    const validateFields = (): boolean => {
        const validationErrors: Partial<BillFormErrors> = {};

        validationErrors.year = yearValidator({ value: fields.year });

        validationErrors.type = {
            valid: Boolean(fields.type),
            message: errors.type?.message ?? '',
        };

        validationErrors.bank = {
            valid: Boolean(fields.bank),
            message: errors.bank?.message ?? '',
        };

        validationErrors.category = {
            valid: Boolean(fields.category),
            message: errors.category?.message ?? '',
        };

        setErrors(validationErrors);
        return (
            validationErrors.year?.valid &&
            validationErrors.bank?.valid &&
            validationErrors.type?.valid &&
            validationErrors.category?.valid
        );
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateFields()) {
            return;
        }

        try {
            await saveItem(fields);
            addAlert({
                type: 'success',
                message: 'Bill saved successfully!',
            });
            setIsModalVisible(false);
            fetchBills();
        } catch (error) {
            addAlert({
                type: 'error',
                message: (error as Error)?.message ?? `Error saving Bill.`,
            });
        } finally {
            setLoading(false);
        }
    };

    const saveItem = async (item: BillParams) => {
        const itemToSave = {
            year: item.year,
            bank: item.bank?.id ?? '',
            type: item.type as EBillType,
            category: item.category?.id ?? '',
        };
        item.id
            ? await billService.update(item.id, itemToSave)
            : await billService.create(itemToSave);
    };

    useEffect(() => {
        fetchBills();
    }, [reload]);

    return loading ? (
        <Spinner context="neutral" />
    ) : (
        <>
            <CRUDHeader
                resourceName="Bill"
                button={hasAllDependencies ? { onClick: () => openModal() } : undefined}
            />
            {banks.length === 0 && (
                <DependencyFallback
                    dependencyName="Bank"
                    resourceName="Bill"
                    button={{
                        label: 'Create Bank',
                        onClick: () => router.push('/banks'),
                    }}
                />
            )}
            {categories.length === 0 && (
                <DependencyFallback
                    dependencyName="Bill Category"
                    resourceName="Bill"
                    button={{
                        label: 'Create Bill Category',
                        onClick: () => router.push('/bills/categories'),
                    }}
                />
            )}
            {isModalVisible && (
                <CRUDModal title={fields?.id ? `Edit Bill` : `Create Bill`}>
                    <form onSubmit={handleSubmit}>
                        <div className="list__form--group">
                            <Input
                                min="1"
                                max="9999"
                                type="number"
                                name="year"
                                label="Year"
                                value={
                                    fields?.year?.toString() ??
                                    new Date().getFullYear().toString()
                                }
                                context="primary"
                                onChange={(e) => handleChange('year', e.target.value)}
                                validate={(year) => yearValidator(year)}
                                placeholder="Enter a year"
                                reloadValidate={errors.year}
                            />
                        </div>
                        <div className="list__form--group">
                            <Select
                                value={fields?.type ?? ''}
                                label="Type"
                                options={Object.values(EBillType).map((item) => ({
                                    value: item,
                                    label: item,
                                }))}
                                onChange={(value) => handleChange('type', value as string)}
                                isInvalid={!errors.type?.valid}
                                placeholder="Choose a type"
                                invalidMessage={errors.type?.message}
                            />
                        </div>
                        <div className="list__form--group">
                            <Select
                                value={fields?.bank?.id ?? ''}
                                label="Bank"
                                options={banks.map((item) => ({
                                    value: item.id,
                                    label: item.name,
                                }))}
                                onChange={(value) => handleChange('bank', value as string)}
                                isInvalid={!errors.bank?.valid}
                                placeholder="Choose a bank"
                                invalidMessage={errors.bank?.message}
                            />
                        </div>
                        <div className="list__form--group">
                            <Select
                                value={fields?.category?.id ?? ''}
                                label="Category"
                                options={categories.map((item) => ({
                                    value: item.id,
                                    label: item.name,
                                }))}
                                onChange={(value) => handleChange('category', value as string)}
                                isInvalid={!errors.category?.valid}
                                placeholder="Choose a category"
                                invalidMessage={errors.category?.message}
                            />
                        </div>
                        <div className="list__form--actions">
                            <Button type="submit" context="success">
                                Save
                            </Button>
                            <Button
                                context="error"
                                appearance="outline"
                                onClick={() => setIsModalVisible(false)}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </CRUDModal>
            )}
            {billListCategory.length === 0 ? (
                <DependencyFallback message="No bills were found." />
            ) : (
                <Tabs
                    fluid
                    tabItems={billListCategory.map((item) => ({
                        title: item.title,
                        children: (
                            <SubTab
                                key={item.title}
                                list={item.list}
                            />
                        ),
                    }))}
                />
            )}
        </>
    );
}