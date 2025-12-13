import MoviesScreen from "@/components/screens/tabs/MoviesScreen";
import { SafeAreaView } from "react-native-safe-area-context";

export default function movies() {
    return (
        <SafeAreaView style={{flex: 1}}>
            <MoviesScreen />
        </SafeAreaView>
    );
}
