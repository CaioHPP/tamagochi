import { useSQLiteContext } from "expo-sqlite";
import { Tamagotchi } from "..";

export function useTamagotchiDatabase() {
  const database = useSQLiteContext();

  async function createTamagotchi(name: string, image: number) {
    const query = await database.prepareAsync(
      `INSERT INTO tamagotchi (name, image) VALUES ($name, $image)`
    );
    try {
      const res = await query.executeAsync({ $name: name, $image: image });
    } catch (error) {
      throw error;
    } finally {
      query.finalizeAsync();
    }
  }

  async function getTamagotchis() {
    const tamagotchis = await database.getAllAsync(`SELECT * FROM tamagotchi`);

    await tamagotchis.forEach(async (tamagotchi: any) => {
      const now = new Date();
      const lastInteraction = new Date(tamagotchi.last_interaction);

      const diff = now.getTime() - lastInteraction.getTime();
      const seconds = Math.abs(diff / 1000);

      if (seconds < 90) return;

      const fomeIdle = Math.floor(seconds / 130);
      const sonoIdle = Math.floor(seconds / 100);
      const diversaoIdle = Math.floor(seconds / 90);

      tamagotchi.fome -= fomeIdle;
      tamagotchi.sono -= sonoIdle;
      tamagotchi.diversao -= diversaoIdle;

      const query = await database.prepareAsync(
        `UPDATE tamagotchi SET fome = $fome, sono = $sono, diversao = $diversao,  last_interaction = CURRENT_TIMESTAMP WHERE id = $id`
      );
      try {
        await query.executeAsync({
          $fome: tamagotchi.fome,
          $sono: tamagotchi.sono,
          $diversao: tamagotchi.diversao,
          $id: tamagotchi.id,
        });
      } catch (error) {
        throw error;
      } finally {
        query.finalizeAsync();
      }
    });
    return await database.getAllAsync(`SELECT * FROM tamagotchi`);
  }

  async function getTamagotchi(id: number) {
    try {
      return await database.getAllAsync(
        `SELECT * FROM tamagotchi WHERE id = $id`,
        { $id: id }
      );
    } catch (error) {
      throw error;
    }
  }

  async function updateTamagotchiAutoDecrease({
    id,
    fome,
    sono,
    diversao,
  }: {
    id: number;
    fome: number;
    sono: number;
    diversao: number;
  }) {
    const query = await database.prepareAsync(
      `UPDATE tamagotchi SET fome = $fome, sono = $sono, diversao = $diversao WHERE id = $id`
    );
    try {
      await query.executeAsync({
        $id: id,
        $fome: fome,
        $sono: sono,
        $diversao: diversao,
      });
    } catch (error) {
      throw error;
    } finally {
      query.finalizeAsync();
    }
  }

  async function updateTamagotchiPlay(id: number, diversao: number) {
    const query = await database.prepareAsync(
      `UPDATE tamagotchi SET diversao = $diversao, last_interaction = CURRENT_TIMESTAMP WHERE id = $id`
    );
    try {
      await query.executeAsync({ $id: id, $diversao: diversao });
    } catch (error) {
      throw error;
    } finally {
      query.finalizeAsync();
    }
  }

  async function updateTamagotchiFeed(id: number, fome: number) {
    const query = await database.prepareAsync(
      `UPDATE tamagotchi SET fome = $fome, last_interaction = CURRENT_TIMESTAMP WHERE id = $id`
    );
    try {
      await query.executeAsync({ $id: id, $fome: fome });
    } catch (error) {
      throw error;
    } finally {
      query.finalizeAsync();
    }
  }

  async function updateTamagotchiSleep(id: number, sono: number) {
    const query = await database.prepareAsync(
      `UPDATE tamagotchi SET sono = $sono, last_interaction = CURRENT_TIMESTAMP WHERE id = $id`
    );
    try {
      await query.executeAsync({ $id: id, $sono: sono });
    } catch (error) {
      throw error;
    } finally {
      query.finalizeAsync();
    }
  }

  async function deleteTamagotchi(id: number) {
    const query = await database.prepareAsync(
      `DELETE FROM tamagotchi WHERE id = $id`
    );
    try {
      await query.executeAsync({ $id: id });
    } catch (error) {
      throw error;
    } finally {
      query.finalizeAsync();
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
