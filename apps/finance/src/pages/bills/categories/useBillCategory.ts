import { useState } from 'react';

import { Paginate } from '@repo/business/paginate';
import { QueryParameters } from '@repo/business/shared/interface';
import BillCategory from "@repo/business/finance/bill-category";

import useAlert from '@repo/ui/hooks/alert/useAlert';

import { billCategoryService } from '../../../shared';


export function useBillCategory() {
    const { addAlert } = useAlert();
    const [loading, setLoading] = useState<boolean>(false);
    const fetchItems = async (params: QueryParameters) => {
        setLoading(true);
        try {
            const response = await billCategoryService.getAll(params);
            return response as Paginate<BillCategory>;
        } catch (error) {
            addAlert({ type: 'error', message: 'Error fetching Bill Categories.' });
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const saveItem = async (item: Partial<BillCategory>) => {
        setLoading(true);
        try {
            if (item.id) {
                return await billCategoryService.update(item.id, { name: item.name ?? '' });
            }
            return await billCategoryService.create({ name: item.name ?? '' });
        } catch (error) {
            addAlert({ type: 'error', message: 'Error saving Bill Category.' });
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const deleteItem = async (id: string) => {
        setLoading(true);
        try {
            return await billCategoryService.remove(id);
        } catch (error) {
            addAlert({ type: 'error', message: 'Error deleting Bill Category.' });
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        saveItem,
        fetchItems,
        deleteItem,
    };
}