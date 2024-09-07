import { useSQLiteContext } from "expo-sqlite";

export function useTamagotchiDatabase() {
    const database = useSQLiteContext();

    async function createTamagotchi(name: string, image: number) {
    
        const query = await database.prepareAsync(`INSERT INTO tamagotchi (name, image) VALUES ($name, $image)`);
        try{   
            const res = await query.executeAsync({$name: name, $image: image});
        } catch (error) {
            throw error;
        }
        finally {
            query.finalizeAsync();
        }
    }

    async function getTamagotchis() {
        try{
           return await database.getAllAsync(`SELECT * FROM tamagotchi`);
        }
        catch (error) {
            throw error;
        }
    }

    async function getTamagotchi(id: number) {
        try{
            return await database.getAllAsync(`SELECT * FROM tamagotchi WHERE id = $id`, {$id: id});
        }
        catch (error) {
            throw error;
        }
    }

    async function updateTamagotchiAutoDecrease({fome, sono, diversao, id}: {fome: number, sono: number, diversao: number, id: number}) {
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

    async function updateTamagotchiPlay(id: number) {
        const query = await database.prepareAsync(`UPDATE tamagotchi SET diversao = diversao + 10 last_interaction = CURRENT_TIMESTAMP WHERE id = $id`);
        try{
            await query.executeAsync(id);
        }
        catch (error) {
            throw error;
        }
        finally {
            query.finalizeAsync();
        }
    }


    async function updateTamagotchiFeed(id: number) {
        const query = await database.prepareAsync(`UPDATE tamagotchi SET fome = fome + 10 last_interaction = CURRENT_TIMESTAMP WHERE id = $id`);
        try{
            await query.executeAsync(id);
        }
        catch (error) {
            throw error;
        }
        finally {
            query.finalizeAsync();
        }
    }

    async function updateTamagotchiSleep(id: number) {
        const query = await database.prepareAsync(`UPDATE tamagotchi SET sono = sono + 10 last_interaction = CURRENT_TIMESTAMP WHERE id = $id`);
        try{
            await query.executeAsync(id);
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
        updateTamagotchiAutoDecrease,
        updateTamagotchiPlay,
        updateTamagotchiFeed,
        updateTamagotchiSleep,
        deleteTamagotchi,
    };
}



