import LatestScreen from "@/components/screens/tabs/LatestScreen";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <LatestScreen />
    </SafeAreaView>
  );
}
