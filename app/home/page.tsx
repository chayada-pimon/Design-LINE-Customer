import { EmployeeCheckInSection } from "@/components/home/employee-check-in-section"
import { EmployeeProfileSection } from "@/components/home/employee-profile-section"
import { EmployeeServicesSection } from "@/components/home/employee-services-section"
import { HomeHeader } from "@/components/home/home-header"
import { HomeLayout } from "@/components/home/home-layout"
import { PageHeading } from "@/components/home/page-heading"

export default function HomePage() {
  return (
    <HomeLayout>
      <HomeHeader />
      <PageHeading>หน้าหลักพนักงาน</PageHeading>
      <EmployeeProfileSection />
      <EmployeeCheckInSection />
      <EmployeeServicesSection />
    </HomeLayout>
  )
}
