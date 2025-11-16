import CitizenReports from '@/components/dashboard/citizen-reports'
import { CitizenReportProvider } from '@/context/citizen-reports-context'

const page = () => {
    return (
      <CitizenReportProvider>
            <CitizenReports />
      </CitizenReportProvider>
  )
}

export default page
