import { Text, TouchableOpacity } from "react-native";


export default function BudgetScreen( { user } : { user: any | null | undefined}) {
    return (
        <TouchableOpacity className="w-full py-4 bg-blue-500 rounded-lg shadow-lg mt-2 text-left items-start px-4">
            <Text className="text-white font-extrabold text-3xl text-center">$100</Text>
            <Text className="text-white font-medium text-center">Your balance is calculated from income & expenses</Text>
        </TouchableOpacity>
    )
}
