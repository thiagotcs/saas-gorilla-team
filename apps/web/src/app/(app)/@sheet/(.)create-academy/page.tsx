import { InterceptedSheetContent } from '@/components/intercepted-sheet-content'
import { Sheet, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import AcademyForm from '../../create-academy/academy-form'

export default function CreateAcademy() {
  return (
    <Sheet defaultOpen>
      <InterceptedSheetContent side="right">
        <SheetHeader className="px-4 pt-4">
          <SheetTitle>Nova Academia</SheetTitle>
        </SheetHeader>

        <div className="px-4 py-2">
          <AcademyForm />
        </div>
      </InterceptedSheetContent>
    </Sheet>
  )
}
