import LawyerAppLayout from '@/components/Layout/LawyerAppLayout'

export default function ToolsPage() {
  return (
    <LawyerAppLayout>
      <h1 className="text-5xl font-bold tracking-tighter">Tools</h1>
      <div className="mt-8 flex flex-col gap-4">
        <div>
          <p className="font-bold">Argument Simulator</p>
          <li>Craft an argument, pulling from precendent.</li>
          <li>Simulate counterarguments.</li>
        </div>
        <div>
          <p className="font-bold">Contract Library</p>
          <li>Manage and draft knowledge base.</li>
        </div>
        <div>
          <p className="font-bold">Sensei</p>
          <li>AI to upskill in-house team on your organization.</li>
          <li>Give external counsel access to key info.</li>
          <li>Redirect employee questions to AI.</li>
        </div>
        <div>
          <p className="font-bold">Legal Dojo</p>
          <p>Test and grow your legal knowledge in our training studio.</p>
        </div>
        <div>
          <p className="font-bold">Brand Studio</p>
          <p>Elevate your brand with our marketing partners.</p>
        </div>
        <div>
          <p className="font-bold">Healthcare</p>
          <p>Healthcare options for independent lawyers.</p>
        </div>
      </div>
    </LawyerAppLayout>
  )
}
