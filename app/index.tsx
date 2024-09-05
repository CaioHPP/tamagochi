import Header from '@/components/Header';
import ListedTamagotchi from '@/components/ListedTamagotchi';
import { Link, router } from 'expo-router';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const TamagotchiList = () => {
    return (
      <SafeAreaView>
        <ScrollView>
        <Header text='+' onPress={() => router.navigate('/TamagotchiAdd')} />
        <ListedTamagotchi id={1} name='Tamagotchi 1' fome={10} sono={10} diversao={10} />
        <ListedTamagotchi id={2} name='Tamagotchi 2' fome={20} sono={20} diversao={20} />
        <ListedTamagotchi id={3} name='Tamagotchi 3' fome={30} sono={30} diversao={30} />
        <ListedTamagotchi id={4} name='Tamagotchi 4' fome={40} sono={40} diversao={40} />
        <ListedTamagotchi id={5} name='Tamagotchi 5' fome={50} sono={50} diversao={50} />
        <ListedTamagotchi id={6} name='Tamagotchi 6' fome={60} sono={60} diversao={60} />
        <ListedTamagotchi id={7} name='Tamagotchi 7' fome={70} sono={70} diversao={70} />
      </ScrollView>
      </SafeAreaView>
    );
}

export default TamagotchiList;