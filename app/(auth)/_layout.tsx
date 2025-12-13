import { Stack } from "expo-router";

export default function AuthLayout() {

    return (
        <Stack>
            <Stack.Screen name="index" options={{
                title: "Register"
            }}
            
            />
            <Stack.Screen name="signin" options={{
                title: "Login"
            }} />
            
        </Stack>
    );
}