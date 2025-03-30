import { View, TouchableOpacity } from 'react-native';
import { Home, Logs, Plus, ChartLine, Settings } from 'lucide-react-native';
import { useRouter, usePathname } from 'expo-router';

export default function NavigationBar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (screen: string) => {
    router.push(screen as any);
    console.log('Navigating to:', screen);
  };

  console.log('Current pathname:', pathname);
  const isActive = (screen: string) => pathname === screen;

  return (
    <View className="absolute bottom-0 left-0 right-0 flex-row justify-between items-center bg-white rounded-3xl shadow-lg p-4 mx-4 mb-4">
      <TouchableOpacity onPress={() => handleNavigation('/(home)')}>
        <Home size={24} color={isActive('/') ? 'blue' : 'gray'} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleNavigation('/(home)/logs')}>
        <Logs size={24} color={isActive('/logs') ? 'blue' : 'gray'} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handleNavigation('/add')}
        className="bg-blue-600 rounded-full p-2 shadow-2xl"
      >
        <Plus size={28} color="white" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleNavigation('/(home)/chart')}>
        <ChartLine size={24} color={isActive('/chart') ? 'blue' : 'gray'} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleNavigation('/(home)/settings')}>
        <Settings size={24} color={isActive('/profile') ? 'blue' : 'gray'} />
      </TouchableOpacity>
    </View>
  );
}