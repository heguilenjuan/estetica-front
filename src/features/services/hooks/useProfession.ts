import { useEffect, useState } from "react";
import type { Profession, ProfessionCreate } from "../types/services.types";
import { createProfession, deleteProfession, getProfessions, updateProfession } from "../service/profession.service";

export const useProfessions = () => {
    const [professions, setProfessions] = useState<Profession[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchProfessions = async () => {
        setError(null);
        setLoading(true);
        try {
            setProfessions(await getProfessions());
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchProfessions(); }, []);

    return { professions, loading, error, refresh: fetchProfessions };
};

export const useCreateProfession = () => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const create = async (payload: ProfessionCreate) => {
        setError(null);
        setLoading(true);
        try {
            await createProfession(payload);
            return true;
        } catch (err) {
            setError((err as Error).message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { create, error, loading };
};

export const useUpdateProfession = () => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const update = async (id: string, payload: Partial<ProfessionCreate>) => {
        setError(null);
        setLoading(true);
        try {
            await updateProfession(id, payload);
            return true;
        } catch (err) {
            setError((err as Error).message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { update, error, loading };
};

export const useDeleteProfession = () => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const remove = async (id: string) => {
        setError(null);
        setLoading(true);
        try {
            await deleteProfession(id);
            return true;
        } catch (err) {
            setError((err as Error).message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { remove, error, loading };
};
