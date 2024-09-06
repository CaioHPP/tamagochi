import { useSQLiteContext } from "expo-sqlite";

export function useTamagotchiDatabase() {
    const database = useSQLiteContext();

    async function createTamagotchi(name: string) {
        const query = await database.prepareAsync(`INSERT INTO tamagotchi (name) VALUES ($name)`);
        try{   
            const res = await query.executeAsync(name);
        } catch (error) {
            throw error;
        }
        finally {
            query.finalizeAsync();
        }
    }

    async function getTamagotchis() {
        try{
           return await database.getAllAsync<any>(`SELECT id,name,fome,sono,diversao FROM tamagotchi`);
        }
        catch (error) {
            throw error;
        }
    }

    async function getTamagotchi(id: number) {
        try{
            return await database.execAsync(`SELECT * FROM tamagotchi WHERE id = ${id}`);
        }
        catch (error) {
            throw error;
        }
    }

    async function updateTamagotchi({fome, sono, diversao, id}: {fome: number, sono: number, diversao: number, id: number}) {
        const query = await database.prepareAsync(`UPDATE tamagotchi SET fome = $fome, sono = $sono, diversao = $diversao WHERE id = $id`);
        try{
            await query.executeAsync(fome, sono, diversao, id);
        }
        catch (error) {
            throw error;
        }
        finally {
            query.finalizeAsync();
        }
    }

    async function deleteTamagotchi(id: number) {
        try{
            await database.execAsync(`DELETE FROM tamagotchi WHERE id = ${id}`);
        }
        catch (error) {
            throw error;
        }
    }

    return {
        createTamagotchi,
        getTamagotchis,
        getTamagotchi,
        updateTamagotchi,
        deleteTamagotchi,
    };
}



