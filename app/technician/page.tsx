import { EmployeeServicesSection } from "@/components/home/employee-services-section"
import { HomeHeader } from "@/components/home/home-header"
import { HomeLayout } from "@/components/home/home-layout"
import { PageHeading } from "@/components/home/page-heading"
import { TechnicianAttendanceSection } from "@/components/technician/technician-attendance-section"
import { TechnicianMenuSection } from "@/components/technician/technician-menu-section"
import { TechnicianProfileSection } from "@/components/technician/technician-profile-section"

export default function TechnicianPage() {
  return (
    <HomeLayout>
      <HomeHeader />
      <PageHeading>หน้าหลักช่าง</PageHeading>
      <TechnicianProfileSection />
      <TechnicianAttendanceSection />
      <TechnicianMenuSection />
      <EmployeeServicesSection />
    </HomeLayout>
  )
}
