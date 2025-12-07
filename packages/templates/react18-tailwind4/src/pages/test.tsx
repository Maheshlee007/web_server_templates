import { Button, Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '@/components/UI';
import { useRef } from "react";
import { useNavigate } from 'react-router-dom';
import DropdownExamples from './DropdownExamples';
import InputDialogExamples from './InputDialogExamples';

function TestComp() {
  const buttonRef = useRef(null);
  
  const handleClick = () => {
    if (buttonRef.current) {
      // alert(buttonRef.current?.value); // Focus the button directly
      // alert(buttonRef.current?.innerText); // Focus the button directly
      // buttonRef.current?.focus(); // Focus the button directly
    }
  };
    return(<div className="flex flex-col justify-between space-y-3 text-white!">
      Hi there just testing
       <div>
         <input type="text" ref={buttonRef} className=" w-md bg-accent-50 text-secondary-900" />
               <Button variant="primary" size="sm" className="rounded-4xl space-x-2 text-lg text-accent-50" >primary</Button>
               <Button variant="outline" size="md" isLoading={false} >primary</Button>
               <Button variant="secondary" size="lg"  onClick={handleClick}>primary</Button>
               <Button variant="glass" size="xl"  >Navigate</Button>
       </div>
      <div className='w-1/2 mx-auto .bg-card-gradient'>
        <Card variant="outline"  hoverable>
        <CardHeader>
          <CardTitle>Welcome</CardTitle>
          <CardDescription>This is a glass card</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card content goes here</p>
        </CardContent>
        <CardFooter>
          <Button variant="primary">Confirm</Button>
          <Button variant="outline">Cancel</Button>
        </CardFooter>
            </Card>
      </div>
      <DropdownExamples/>
      <InputDialogExamples/>
    </div>)
}

export default TestComp;