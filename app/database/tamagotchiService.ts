import { useSQLiteContext } from "expo-sqlite";
import { Tamagotchi } from "..";

export function useTamagotchiDatabase() {
  const database = useSQLiteContext();

  async function createTamagotchi(name: string, image: number) {
    const query = await database.prepareAsync(
      // `INSERT INTO tamagotchi (name, image, fome, sono, diversao) VALUES ($name, $image, 100, 100, 100)`
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

      if (seconds < 100) return;

      const fomeIdle = Math.floor(seconds / 100);
      const sonoIdle = Math.floor(seconds / 100);
      const diversaoIdle = Math.floor(seconds / 100);

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
    fome,
    sono,
    diversao,
    id,
  }: {
    fome: number;
    sono: number;
    diversao: number;
    id: number;
  }) {
    const query = await database.prepareAsync(
      `UPDATE tamagotchi SET fome = $fome, sono = $sono, diversao = $diversao WHERE id = $id`
    );
    try {
      await query.executeAsync(fome, sono, diversao, id);
    } catch (error) {
      throw error;
    } finally {
      query.finalizeAsync();
    }
  }

  // async function updateTamagotchiPlay(id: number) {
  //   const query = await database.prepareAsync(
  //     `UPDATE tamagotchi SET diversao = diversao + 10, last_interaction = CURRENT_TIMESTAMP WHERE id = $id`
  //   );
  //   try {
  //     await query.executeAsync(id);
  //   } catch (error) {
  //     throw error;
  //   } finally {
  //     query.finalizeAsync();
  //   }
  // }

  // async function updateTamagotchiFeed(id: number) {
  //   const query = await database.prepareAsync(
  //     `UPDATE tamagotchi SET fome = fome + 10, last_interaction = CURRENT_TIMESTAMP WHERE id = $id`
  //   );
  //   try {
  //     await query.executeAsync(id);
  //   } catch (error) {
  //     throw error;
  //   } finally {
  //     query.finalizeAsync();
  //   }
  // }

  // async function updateTamagotchiSleep(id: number) {
  //   const query = await database.prepareAsync(
  //     `UPDATE tamagotchi SET sono = sono + 10, last_interaction = CURRENT_TIMESTAMP WHERE id = $id`
  //   );
  //   try {
  //     await query.executeAsync(id);
  //   } catch (error) {
  //     throw error;
  //   } finally {
  //     query.finalizeAsync();
  //   }
  // }

  async function updateTamagotchiStatus(
    id: number,
    { fome, sono, diversao }: { fome: number; sono: number; diversao: number }
  ) {
    console.log(
      `Atualizando Tamagotchi ${id} para: Fome = ${fome}, Sono = ${sono}, Diversão = ${diversao}`
    );
    const query = await database.prepareAsync(
      `UPDATE tamagotchi SET fome = $fome, sono = $sono, diversao = $diversao, last_interaction = CURRENT_TIMESTAMP WHERE id = $id`
    );
    try {
      await query.executeAsync({
        $fome: fome,
        $sono: sono,
        $diversao: diversao,
        $id: id,
      });
      console.log("deu certo");
    } catch (error) {
      console.error("Erro ao atualizar o Tamagotchi:", error);
      throw error;
    } finally {
      query.finalizeAsync();
    }
  }

  async function deleteTamagotchi(id: number) {
    try {
      await database.execAsync(`DELETE FROM tamagotchi WHERE id = ${id}`);
    } catch (error) {
      throw error;
    }
  }

  return {
    createTamagotchi,
    getTamagotchis,
    getTamagotchi,
    updateTamagotchiAutoDecrease,
    // updateTamagotchiPlay,
    // updateTamagotchiFeed,
    // updateTamagotchiSleep,
    updateTamagotchiStatus, // Aqui está a função adicionada
    deleteTamagotchi,
  };
}
